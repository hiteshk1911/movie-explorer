import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await tmdb.get(`/movie/${id}`);
        setMovie(res.data);

        const videoRes = await tmdb.get(`/movie/${id}/videos`);
        const trailerVideo = videoRes.data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(trailerVideo);

        const recRes = await tmdb.get(`/movie/${id}/similar`);
        setRecommendations(recRes.data.results.slice(0, 10));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!movie) return <div className="text-white">Movie not found.</div>;

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg md:w-1/3"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 my-2">{movie.release_date} | {movie.runtime} min</p>
          <p className="my-4">{movie.overview}</p>
          <p className="font-semibold">Rating: {movie.vote_average}</p>
          <p className="mt-2">Genres: {movie.genres.map(g => g.name).join(", ")}</p>
          {trailer && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Trailer</h2>
              <iframe
                className="w-full h-64 md:h-96 rounded"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="flex gap-4 overflow-x-scroll">
          {recommendations.map(m => (
            <div key={m.id} className="flex-none w-40">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
