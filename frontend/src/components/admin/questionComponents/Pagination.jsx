 import React from "react";

const Pagination = ({ page, totalPages, setPage }) => {
  const getPageNumbers = () => {
    const pages = [];

    // Show all pages if there are 7 or fewer
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Beginning
    if (page <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // End
    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle
    return [
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

      {/* Previous */}

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-4 py-2 rounded-lg font-medium
        ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}

      {pages.map((item, index) =>
        item === "..." ? (
          <span
            key={index}
            className="px-2 text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(item)}
            className={`w-10 h-10 rounded-lg font-semibold transition
            ${
              page === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-4 py-2 rounded-lg font-medium
        ${
          page === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;