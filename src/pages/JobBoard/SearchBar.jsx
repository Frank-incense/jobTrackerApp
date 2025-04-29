	
import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearInput = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button
          type="button"
          className="clear-btn"
          onClick={clearInput}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;

