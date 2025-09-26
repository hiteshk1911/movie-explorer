import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    tmdb.get("/search/movie", { params: { query } })
      .then(res => {
        setMovies(res.data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-white text-xl">
        Searching for "{query}"...
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.length > 0 ? (
        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <div className="text-white">No results for "{query}"</div>
      )}
    </div>
  );
}

export default Search;
