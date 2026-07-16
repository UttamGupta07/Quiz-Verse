 import React, { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Lock,
  Trophy,
  CheckCircle,
  XCircle,
  Target,
  Star,
} from "lucide-react";

const Profile = () => {
   const navigate=useNavigate()
      const {token}=useAuth();
    useEffect(() => {
  if (!token) {
    toast.error("login first to access profile");
    navigate("/login", { replace: true });
    return;
  }

  fetchProfile();
}, [token]);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3030/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const { user, stats } = profile;

  const accuracy =
    stats.totalQuestions === 0
      ? 0
      : (
          (stats.correctAnswers / stats.totalQuestions) *
          100
        ).toFixed(1);

  const cards = [
    {
      title: "Quizzes Played",
      value: stats.totalQuizzes,
      icon: <Trophy size={28} className="text-indigo-600" />,
      bg: "bg-indigo-100",
      color: "text-gray-900",
    },
    {
      title: "Correct Answers",
      value: stats.correctAnswers,
      icon: <CheckCircle size={28} className="text-green-600" />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Wrong Answers",
      value: stats.wrongAnswers,
      icon: <XCircle size={28} className="text-red-600" />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Accuracy",
      value: `${accuracy}%`,
      icon: <Target size={28} className="text-blue-600" />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Total Score",
      value: stats.totalScore,
      icon: <Star size={28} className="text-yellow-600" />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Best Score",
      value: stats.bestScore,
      icon: <Trophy size={28} className="text-purple-600" />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="h-44 bg-gradient-to-r from-indigo-700 to-blue-600 relative">

            <div className="absolute left-10 top-24">
              <div className="w-40 h-40 rounded-full bg-white shadow-xl flex justify-center items-center border-8 border-gray-100">
                <User size={90} className="text-indigo-500" />
              </div>
            </div>

          </div>

          <div className="pt-24 pb-8 px-10 flex flex-col lg:flex-row justify-between lg:items-center">

            <div className="lg:ml-44">

              <h1 className="text-4xl font-bold">
                {user.name}
              </h1>

              <div className="flex items-center mt-4 text-gray-600">
                <Mail size={20} />
                <span className="ml-3">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center mt-3 text-gray-600">
                <Calendar size={20} />
                <span className="ml-3">
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>

            </div>

            <div className="flex gap-3 mt-8 lg:mt-0">

              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                <Edit size={18} />
                Edit Profile
              </button>

              <button className="flex items-center gap-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition">
                <Lock size={18} />
                Password
              </button>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-7 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-5">

                <div
                  className={`w-20 h-20 rounded-full ${card.bg} flex items-center justify-center`}
                >
                  {card.icon}
                </div>

                <div>

                  <p className="text-gray-500">
                    {card.title}
                  </p>

                  <h2 className={`text-4xl font-bold mt-2 ${card.color}`}>
                    {card.value}
                  </h2>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Profile;