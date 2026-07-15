import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AttemptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    fetchAttempt();
  }, []);

  const fetchAttempt = async () => {
    try {
      console.log(id);
      
      const res = await axios.get(
        `http://localhost:3030/admin/attempts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      

      setAttempt(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!attempt) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* User Info */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl">
            <FaUser />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {attempt.userId.name}
            </h1>

            <p className="text-gray-500">
              {attempt.userId.email}
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Category</p>
          <h2 className="text-xl font-bold">
            {attempt.category}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Sub Category</p>
          <h2 className="text-xl font-bold">
            {attempt.subCategory}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Difficulty</p>
          <h2 className="text-xl font-bold">
            {attempt.difficulty}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Time Taken</p>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaClock />
            {attempt.timeTaken}s
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Score</p>
          <h2 className="text-3xl font-bold">
            {attempt.score}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Percentage</p>
          <h2 className="text-3xl font-bold">
            {attempt.percentage}%
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Correct</p>
          <h2 className="text-3xl text-green-600 font-bold">
            {attempt.correctAnswers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Wrong</p>
          <h2 className="text-3xl text-red-600 font-bold">
            {attempt.wrongAnswers}
          </h2>
        </div>

      </div>

      {/* Questions */}

      <div className="space-y-6">

        {attempt.answers.map((answer, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="font-semibold text-lg">
              Q{index + 1}. {answer.questionId.question}
            </h2>

            <div className="mt-4 space-y-2">

              {answer.questionId.options.map((option) => (

                <div
                  key={option}
                  className={`border rounded-lg p-3

                  ${
                    option === answer.questionId.correctAnswer
                      ? "bg-green-100 border-green-500"
                      : option === answer.selectedAnswer
                      ? "bg-red-100 border-red-500"
                      : ""
                  }`}
                >
                  {option}
                </div>

              ))}

            </div>

            <div className="mt-4">

              <p>
                <strong>Selected :</strong>{" "}
                {answer.selectedAnswer}
              </p>

              <p>
                <strong>Correct :</strong>{" "}
                {answer.questionId.correctAnswer}
              </p>

              <div className="mt-2">

                {answer.isCorrect ? (

                  <span className="text-green-600 flex items-center gap-2">
                    <FaCheckCircle />
                    Correct
                  </span>

                ) : (

                  <span className="text-red-600 flex items-center gap-2">
                    <FaTimesCircle />
                    Wrong
                  </span>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AttemptDetails;