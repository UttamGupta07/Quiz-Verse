import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3030/quiz/review/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        

        setAnswers(res.data.review.answers);
      } catch (err) {
        toast.error(err);

        if (err.response?.status === 401) {
          toast.error("Please login first.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
       <div className="max-w-5xl mx-auto p-6">
  <h1 className="text-4xl font-bold text-center mb-6">
    Quiz Review
  </h1>

  <div className="flex justify-between items-center mb-8">
    <button
      onClick={() => navigate("/")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
    >
      🏠 Home
    </button>

    <button
      onClick={() => navigate("/dashboard")}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
    >
      📊 Dashboard
    </button>
  </div>

  {/* Questions */}
</div>

      {answers.map((item, index) => {
        const question = item.questionId;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <h2 className="font-bold text-xl mb-4">
              Q{index + 1}. {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, i) => {
                let color =
                  "border-gray-300 bg-white";

                if (option === question.correctAnswer) {
                  color = "bg-green-100 border-green-600";
                }

                if (
                  option === item.selectedAnswer &&
                  option !== question.correctAnswer
                ) {
                  color = "bg-red-100 border-red-600";
                }

                return (
                  <div
                    key={i}
                    className={`border-2 rounded-lg p-3 ${color}`}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <p>
                <span className="font-semibold">
                  Your Answer:
                </span>{" "}
                {item.selectedAnswer || "Not Attempted"}
              </p>

              <p>
                <span className="font-semibold">
                  Correct Answer:
                </span>{" "}
                {question.correctAnswer}
              </p>

              <p
                className={`font-bold mt-2 ${
                  item.isCorrect
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.isCorrect ? "✔ Correct" : "✖ Incorrect"}
              </p>

              {question.explanation && (
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <span className="font-semibold">
                    Explanation:
                  </span>
                  <p>{question.explanation}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <button
  onClick={() => navigate(-1)}
  className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition"
>
  ← Back
</button>
    </div>
  );
};

export default Review;