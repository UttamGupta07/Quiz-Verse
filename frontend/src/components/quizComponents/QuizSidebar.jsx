import React from "react";

const QuizSidebar = ({
  questions,
  currentQuestion,
  answers,
  timeLeft,
  onQuestionClick,
  onSubmit,
}) => {
  // Format timer
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div  className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">

      {/* Timer */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-700">
          Time Remaining
        </h2>

        <div className="mt-3 text-4xl font-bold text-red-500">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8">
        <h3 className="font-semibold mb-3">
          Questions
        </h3>

        <div className="grid grid-cols-5 gap-3">
          {questions.map((_, index) => {
            let bg = "bg-gray-200";

            if (answers[questions[index]._id]) bg = "bg-green-500 text-white";

            if (currentQuestion === index)
              bg = "bg-blue-600 text-white";

            return (
              <button
                key={index}
                onClick={() => onQuestionClick(index)}
                className={`h-10 w-10 rounded-lg font-semibold transition ${bg}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 space-y-2 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-600"></div>
          <span>Current</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span>Answered</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300"></div>
          <span>Not Answered</span>
        </div>

      </div>

      {/* Submit */}
      <button
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
        onClick={onSubmit}
      >
        Submit Quiz
      </button>

    </div>
  );
};

export default QuizSidebar;