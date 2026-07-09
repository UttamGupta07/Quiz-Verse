 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Categories = () => {
    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const url = "http://localhost:3030/quiz/categories";
      const res = await axios.get(url);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Quiz Categories
        </h1>
        <p className="text-gray-400 mt-3">
          Choose a category and start testing your knowledge.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 hover:border-indigo-500 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-3xl mx-auto mb-5">
              📚
            </div>

            {/* Category */}
            <h2 className="text-2xl font-bold text-center text-white">
              {category.category}
            </h2>

            {/* Questions */}
            <p className="text-gray-400 text-center mt-3">
              {category.totalQuestions} Questions
            </p>

            {/* Button */}
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            onClick={() => navigate(`/categories/${category.category}`)}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;