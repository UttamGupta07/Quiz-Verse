import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EditQuestion = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    difficulty: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/admin/questions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(res.data.question);
    } catch (err) {
      toast.error("Unable to fetch question");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;

    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3030/admin/questions/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Question Updated Successfully");

      navigate("/admin/questions");
    } catch (err) {
      toast.error("Unable to update question");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Question
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Category */}

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option>Development</option>
          <option>Aptitude</option>
          <option>GK-GS</option>
        </select>

        {/* Sub Category */}

        <input
          type="text"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Difficulty */}

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Question */}

        <textarea
          rows={4}
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Options */}

        {formData.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) =>
              handleOptionChange(index, e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            placeholder={`Option ${index + 1}`}
          />
        ))}

        {/* Correct Answer */}

        <select
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          {formData.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Update Question
        </button>

      </form>

    </div>
  );
};

export default EditQuestion;