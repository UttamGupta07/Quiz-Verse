 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Percent,
  Clock,
  RotateCcw,
  Home,
} from "lucide-react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // If navigated from Quiz page, state will be available
  const [result, setResult] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  const loadResult = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3030/quiz/result/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Change this if your backend returns { quiz: ... }
      setResult(res.data);
      // setResult(res.data.quiz);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch only if opened from dashboard
    if (!location.state && id) {
      loadResult();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        No Result Found
      </div>
    );
  }

  const {
    _id,
    score,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    percentage,
    timeTaken,
  } = result;

  const skipped = totalQuestions - correctAnswers - wrongAnswers;

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

        {/* Header */}

        <div className="text-center">

          <Trophy size={70} className="mx-auto text-yellow-500" />

          <h1 className="text-4xl font-bold mt-4">
            Quiz Completed 🎉
          </h1>

          <p className="text-gray-500 mt-2">
            Here is your performance summary
          </p>

        </div>

        {/* Score */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8 text-center">

          <h2 className="text-xl">Your Score</h2>

          <h1 className="text-6xl font-bold mt-3">
            {score}/{totalQuestions}
          </h1>

          <p className="text-xl mt-3">
            {percentage}%
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

          <div className="bg-green-100 rounded-xl p-5 text-center">

            <CheckCircle className="mx-auto text-green-600" size={40} />

            <h3 className="mt-3 font-semibold">
              Correct
            </h3>

            <p className="text-3xl font-bold text-green-700">
              {correctAnswers}
            </p>

          </div>

          <div className="bg-red-100 rounded-xl p-5 text-center">

            <XCircle className="mx-auto text-red-600" size={40} />

            <h3 className="mt-3 font-semibold">
              Wrong
            </h3>

            <p className="text-3xl font-bold text-red-700">
              {wrongAnswers}
            </p>

          </div>

          <div className="bg-yellow-100 rounded-xl p-5 text-center">

            <Percent className="mx-auto text-yellow-600" size={40} />

            <h3 className="mt-3 font-semibold">
              Skipped
            </h3>

            <p className="text-3xl font-bold text-yellow-700">
              {skipped}
            </p>

          </div>

          <div className="bg-blue-100 rounded-xl p-5 text-center">

            <Clock className="mx-auto text-blue-600" size={40} />

            <h3 className="mt-3 font-semibold">
              Time
            </h3>

            <p className="text-2xl font-bold text-blue-700">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <button
            onClick={() => navigate(`/review/${_id}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Review Answers
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            <Home size={20} />
            Home
          </button>

          <button
            onClick={() => navigate("/categories")}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
          >
            <RotateCcw size={20} />
            Play Again
          </button>

        </div>

      </div>
    </div>
  );
};

export default Result;