import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDarkMode(saved);
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-900 text-white">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold">Movie Explorer</Link>
        <Link to="/favorites" className="hover:text-yellow-500">Favorites</Link>
      </div>
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="rounded-l px-2 py-1 text-black"
          />
          <button
            type="submit"
            className="bg-yellow-500 px-3 py-1 rounded-r hover:bg-yellow-400"
          >Search</button>
        </form>
        <button
          onClick={toggleDarkMode}
          className="ml-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
