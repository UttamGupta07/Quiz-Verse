 import React from "react";

const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onNext,
  onPrevious,
}) => {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col sticky top-6 ">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">QuizVerse</h1>
          <p className="text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="mt-8 flex-1">
        <h2 className="text-xl font-semibold mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition duration-200
                ${
                  selectedAnswer === option
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
            >
              <span className="font-semibold mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {currentQuestion === totalQuestions - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;