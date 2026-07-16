 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaQuestionCircle,
  FaFolderOpen,
  FaClipboardList,
  FaStar,
  FaFire,
} from "react-icons/fa";

const AdminDashboard = () => {
  const {token} = useAuth()

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await  axios.get("http://localhost:3030/admin/dashboard", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setDashboard(res.data);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to load dashboard")
    }
  };

  if (!dashboard) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Users",
      value: dashboard.totalUsers,
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Questions",
      value: dashboard.totalQuestions,
      icon: <FaQuestionCircle />,
      color: "bg-green-500",
    },
    {
      title: "Sub Categories",
      value: dashboard.totalSubCategories,
      icon: <FaFolderOpen />,
      color: "bg-purple-500",
    },
    {
      title: "Attempts",
      value: dashboard.totalAttempts,
      icon: <FaClipboardList />,
      color: "bg-red-500",
    },
    {
      title: "Average Score",
      value: `${dashboard.averageScore}%`,
      icon: <FaStar />,
      color: "bg-yellow-500",
    },
    {
      title: "Most Played",
      value: dashboard.mostPlayedCategory,
      icon: <FaFire />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl`}
            >
              {card.icon}
            </div>
          </div>
        ))}

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Attempts */}

        <div className="bg-white rounded-xl shadow">

          <div className="border-b px-5 py-4">
            <h2 className="text-xl font-semibold">
              Recent Quiz Attempts
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">
                  User
                </th>

                <th>Category</th>

                <th>Score</th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentAttempts.map((attempt) => (

                <tr
                  key={attempt._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {attempt.userId?.name}
                  </td>

                  <td>
                    {attempt.category}
                  </td>

                  <td>
                    {attempt.score}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Recent Users */}

        <div className="bg-white rounded-xl shadow">

          <div className="border-b px-5 py-4">
            <h2 className="text-xl font-semibold">
              Recent Users
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">
                  Name
                </th>

                <th>Email</th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;