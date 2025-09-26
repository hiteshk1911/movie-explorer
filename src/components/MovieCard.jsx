import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.some((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavs = isFavorite ? favs.filter((m) => m.id !== movie.id) : [...favs, movie];
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.png";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer relative"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover" loading="lazy"/>
      <div className="p-2">
        <h3 className="text-white font-semibold">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 p-1 rounded-full ${isFavorite ? "bg-red-500" : "bg-gray-700"}`}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        ❤️
      </button>
    </motion.div>
  );
}

export default MovieCard;
