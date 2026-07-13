import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const SubCategories = () => {
   const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [noOfQuestions, setNoOfQuestions] = useState(10)
  const [difficulty, setDifficulty] = useState("Easy");
  const [subCategories, setSubCategories] = useState([]);
  const[subCategory,setSubCategory]=useState("");
  const { category } = useParams();
  const token = localStorage.getItem("token");

  const getSubCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/quiz/categories/${category}/subcategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );


      setSubCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelQuiz=()=>{
    const quizPara={
      category,
      noOfQuestions,
      difficulty,
      subCategory

    }
    localStorage.setItem("quizPara",JSON.stringify(quizPara));
  }

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

            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition" 
            onClick={()=>{
             setSubCategory(sub.subCategory)  ;
              setShowModal(true)}}>
              Continue
            </button>
          </div>
        ))}
      </div>
      {
        showModal && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-white w-96 rounded-xl p-6">

              <h2 className="text-2xl font-bold mb-5 text-center">
                Quiz Settings
              </h2>

              {/* Number of Questions */}

              <div className="mb-4">
                <label className="font-semibold block mb-2">
                  Number of Questions
                </label>

                <select
                  value={noOfQuestions}
                  onChange={(e) =>{setNoOfQuestions(Number(e.target.value))}}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="20">30</option>
                  <option value="20">40</option>
                  <option value="20">50</option>
                </select>
              </div>

              {/* Difficulty */}

              <div className="mb-6">

                <label className="font-semibold block mb-2">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) => {setDifficulty(e.target.value)}}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

              </div>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                  onClick={()=>{
                    handelQuiz();
                    navigate("/quiz");
                  }}
                >
                  Start Quiz
                </button>

              </div>

            </div>

          </div>
        )
      }


    </div>

  );
};

export default SubCategories;