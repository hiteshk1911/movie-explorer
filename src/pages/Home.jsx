import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" }
];

function Home() {
  const [trending, setTrending] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  useEffect(() => {
    tmdb.get("/trending/movie/week").then(res => setTrending(res.data.results));
    genres.forEach(async g => {
      const res = await tmdb.get("/discover/movie", { params: { with_genres: g.id } });
      setGenreMovies(prev => ({ ...prev, [g.name]: res.data.results }));
    });
  }, []);

  return (
    <div className="p-4 text-white">
      {/* Hero Carousel */}
      <Swiper spaceBetween={10} slidesPerView={1} loop autoplay={{ delay: 3000 }}>
        {trending.slice(0, 5).map(movie => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative h-96 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
              <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full rounded-b-lg">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Genre Sections */}
      {genres.map(g => (
        <div key={g.id} className="mt-6">
          <h2 className="text-xl font-bold mb-2">{g.name}</h2>
          <div className="flex overflow-x-scroll gap-4">
            {genreMovies[g.name]?.map(movie => (
              <div key={movie.id} className="flex-none w-40">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
