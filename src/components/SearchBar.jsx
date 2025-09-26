import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="rounded-l px-3 py-1 text-black flex-1"
      />
      <button
        type="submit"
        className="bg-yellow-500 px-4 py-1 rounded-r hover:bg-yellow-400"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
