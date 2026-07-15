import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaClipboardList,
  FaTrophy,
  FaPercentage,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  

  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="text-center mt-20 text-xl">
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

      <div className="bg-white shadow rounded-xl p-8">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-5xl">
            <FaUser />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {data.user.name}
            </h1>

            <p className="text-gray-500">
              {data.user.email}
            </p>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <FaClipboardList className="text-3xl text-blue-600 mb-3" />
          <p>Total Attempts</p>
          <h2 className="text-3xl font-bold">
            {data.stats.totalAttempts}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaTrophy className="text-3xl text-green-600 mb-3" />
          <p>Highest Score</p>
          <h2 className="text-3xl font-bold">
            {data.stats.highestScore}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaPercentage className="text-3xl text-yellow-600 mb-3" />
          <p>Average %</p>
          <h2 className="text-3xl font-bold">
            {data.stats.averageScore}%
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaCalendar className="text-3xl text-red-600 mb-3" />
          <p>Joined</p>
          <h2 className="text-lg font-semibold">
            {new Date(data.user.createdAt).toLocaleDateString()}
          </h2>
        </div>

      </div>

      <div className="bg-white shadow rounded-xl">

        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">
            Quiz History
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Category
              </th>

              <th>SubCategory</th>

              <th>Difficulty</th>

              <th>Score</th>

              <th>Percentage</th>

            </tr>

          </thead>

          <tbody>

            {data.attempts.map((attempt) => (

              <tr
                key={attempt._id}
                className="border-t"
              >

                <td className="p-3">
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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserDetails;