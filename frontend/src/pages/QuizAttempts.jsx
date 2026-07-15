import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuizAttempts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [attempts, setAttempts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3030/admin/attempts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttempts(res.data.attempts);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch quiz attempts");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this quiz attempt?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3030/admin/attempts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAttempts();
    } catch (err) {
      console.log(err);
      alert("Unable to delete attempt");
    }
  };

  const filteredAttempts = useMemo(() => {
    return attempts.filter((attempt) => {
      const matchesSearch =
        attempt.userId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) || false;

      const matchesCategory =
        category === "" || attempt.category === category;

      const matchesDifficulty =
        difficulty === "" ||
        attempt.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty
      );
    });
  }, [attempts, search, category, difficulty]);

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

        <h1 className="text-3xl font-bold text-gray-800">
          Quiz Attempts
        </h1>

        <div className="flex flex-wrap gap-3">

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            <option>Development</option>
            <option>Aptitude</option>
            <option>GK-GS</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-indigo-600 text-white">

            <tr>

              <th className="p-4 text-left">
                User
              </th>

              <th>Category</th>

              <th>SubCategory</th>

              <th>Difficulty</th>

              <th>Score</th>

              <th>Percentage</th>

              <th>Date</th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAttempts.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500"
                >
                  No Attempts Found
                </td>

              </tr>

            ) : (

              filteredAttempts.map((attempt) => (

                <tr
                  key={attempt._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {attempt.userId?.name}
                  </td>

                  <td>
                    {attempt.category}
                  </td>

                  <td>
                    {attempt.subCategory}
                  </td>

                  <td>
                    {attempt.difficulty}
                  </td>

                  <td>
                    {attempt.score}
                  </td>

                  <td>
                    {attempt.percentage}%
                  </td>

                  <td>
                    {new Date(
                      attempt.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/attempts/${attempt._id}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(attempt._id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default QuizAttempts;