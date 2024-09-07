import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8800/search/sortbypriceandname?cropName=${searchTerm}`,
        { withCredentials: true }
      );

      const searchResults = response.data.suggestions || response.data.demands;

      // Save search results in localStorage
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
      localStorage.setItem("searchTerm", searchTerm);

      // Navigate to Marketplace or update state if already there
      if (location.pathname === "/marketplace") {
        navigate(location.pathname, {
          state: {
            results: searchResults,
            searchTerm,
          },
        });
      } else {
        navigate("/marketplace", {
          state: {
            results: searchResults,
            searchTerm,
          },
        });
      }
    } catch (error) {
      setError("Error fetching search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 mr-8 mt-8 flex flex-col items-center">
      <form onSubmit={handleSearch} className="w-full max-w-md flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for crops by name..."
          className="w-full p-2 border rounded-l-md outline-none"
        />
        <button type="submit" className="p-2 bg-primary text-white rounded-r-md">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
};

export default SearchBar;
