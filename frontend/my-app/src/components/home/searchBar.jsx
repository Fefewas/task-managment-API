import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const SearchBar = ({ setTasks, fetchGetTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:7000/tasks/search/title",
        {
          params: {
            query,
          },
        }
      );

      if (Array.isArray(response.data) && response.data.length === 0) {
        fetchGetTasks();
        setTimeout(() => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }, 200);
      } else {
        setTasks(response.data);
        setError(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
    setDebounceTimeout(timeout);
  };

  return (
    <div>
      <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-[30vh] flex">
          <div className="absolute inset-y-0 start-0 flex items-center text-xl ps-3 pointer-events-none">
            <CiSearch />
          </div>
          <input
            type="search"
            id="defaultSearch"
            className={`block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Search"
            value={searchQuery}
            onChange={handleChange}
          />
          {error && <span className="text-red-500 px-3">No tasks found</span>}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
