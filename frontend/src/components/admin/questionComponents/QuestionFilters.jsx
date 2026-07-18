import React from "react";

const QuestionFilters = ({ filters, setFilters, setPage }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Whenever a filter changes, go back to page 1
    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "All",
      subCategory: "All",
      difficulty: "All",
    });

    setPage(1);
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Search */}
        <input
          type="text"
          name="search"
          placeholder="Search Question..."
          value={filters.search}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Development">Development</option>
          <option value="GK-GS">GK-GS</option>
          <option value="Aptitude">Aptitude</option>
        </select>

        {/* SubCategory */}
        <input
          type="text"
          name="subCategory"
          placeholder="Sub Category"
          value={filters.subCategory === "All" ? "" : filters.subCategory}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              subCategory: e.target.value || "All",
            }))
          }
          className="border rounded-lg px-4 py-2"
        />

        {/* Difficulty */}
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
};

export default QuestionFilters;