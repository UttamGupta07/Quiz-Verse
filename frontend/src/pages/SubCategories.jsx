import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const { category } = useParams();

  const getSubCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/quiz/categories/${category}/subcategories`
      );

      setSubCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white capitalize">
          {category} Subcategories
        </h1>

        <p className="text-gray-400 mt-3">
          Select a topic to begin your quiz.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subCategories.map((sub, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg hover:border-indigo-500 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
              💡
            </div>

            <h2 className="text-2xl font-bold text-center text-white capitalize">
              {sub.subCategory}
            </h2>

            <p className="text-center text-gray-400 mt-3">
              {sub.totalQuestions} Questions
            </p>

            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;