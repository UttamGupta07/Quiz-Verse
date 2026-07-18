import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuestionTable = ({
  loading,
  questions,
  selectedQuestions,
  setSelectedQuestions,
  setDeleteId,
setShowDeleteModal,
}) => {
  const navigate = useNavigate();

  // Select All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedQuestions(questions.map((q) => q._id));
    } else {
      setSelectedQuestions([]);
    }
  };

  // Select One
  const handleSelect = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(
        selectedQuestions.filter((item) => item !== id)
      );
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold py-10">
        Loading Questions...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">

      <table className="min-w-full">

        {/* Header */}

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="px-4 py-3">

              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  questions.length > 0 &&
                  selectedQuestions.length === questions.length
                }
              />

            </th>

            <th className="px-4 py-3">Question</th>

            <th className="px-4 py-3">Category</th>

            <th className="px-4 py-3">SubCategory</th>

            <th className="px-4 py-3">Difficulty</th>

            <th className="px-4 py-3">Actions</th>

          </tr>

        </thead>

        {/* Body */}

        <tbody>

          {questions.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-8 text-gray-500"
              >
                No Questions Found
              </td>

            </tr>

          ) : (

            questions.map((question) => (

              <tr
                key={question._id}
                className="border-b hover:bg-gray-50"
              >

                {/* Checkbox */}

                <td className="text-center py-4">

                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => handleSelect(question._id)}
                  />

                </td>

                {/* Question */}

                <td className="px-4 py-4 max-w-md">
                  {question.question}
                </td>

                {/* Category */}

                <td className="px-4 py-4">
                  {question.category}
                </td>

                {/* SubCategory */}

                <td className="px-4 py-4">
                  {question.subCategory}
                </td>

                {/* Difficulty */}

                <td className="px-4 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm
                    ${
                      question.difficulty === "Easy"
                        ? "bg-green-500"
                        : question.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {question.difficulty}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-4 py-4">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        navigate(`/admin/questions/edit/${question._id}`)
                      }
                      className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                       onClick={() => {
    setDeleteId(question._id);
    setShowDeleteModal(true);
}}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default QuestionTable;