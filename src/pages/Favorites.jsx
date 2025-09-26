import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setMovies(favs);
  }, []);

  if (movies.length === 0)
    return (
      <div className="text-white text-center mt-10">
        You have no favorite movies yet.
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Favorites;
