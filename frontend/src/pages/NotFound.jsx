import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Home size={20} />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;