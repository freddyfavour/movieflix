import React from "react";
import { X } from "lucide-react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search relative flex items-center">
      <img
        src="./search.svg"
        alt="search icon"
        className="absolute left-3 h-5 w-5"
      />
      <input
        type="text"
        placeholder="Enter movie name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-transparent py-2 pl-10 sm:pr-10 text-base text-black placeholder-black outline-none"
      />
      {searchTerm && (
        <X
          className="absolute right-3 text-black cursor-pointer w-5 h-5"
          onClick={() => setSearchTerm("")}
        />
      )}
    </div>
  );
};

export default Search;
