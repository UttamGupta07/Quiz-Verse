import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/quizComponents/QuizCard";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const navigate=useNavigate()
    const [data, setData] = useState(null);
    const {token}=useAuth();
    useEffect(() => {
  if (!token) {
    toast.error("login first to access dashboard");
    navigate("/login", { replace: true });
    return;
  }

  loadDashboard();
}, [token]);

    const loadDashboard = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3030/user/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(res.data);
        } catch (err) {
            toast.error(err);
            
        }
    };

    // useEffect(() => {
    //     loadDashboard();
    // }, []);

    if (!data) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Welcome to Dashboard,{data.name}
                </h1>

                {/* Statistics */}

                <div className="grid md:grid-cols-4 gap-6">

                    <StatCard
                        title="Total Quizzes"
                        value={data.totalQuizzes}
                        color="bg-blue-500"
                    />

                    <StatCard
                        title="Highest Score"
                        value={`${data.highestScore}%`}
                        color="bg-green-500"
                    />

                    <StatCard
                        title="Average Score"
                        value={`${data.averageScore}%`}
                        color="bg-purple-500"
                    />

                    <StatCard
                        title="Accuracy"
                        value={`${data.accuracy}%`}
                        color="bg-orange-500"
                    />

                </div>

                {/* Recent Attempts */}
                <div className="mt-10"> 

                    <h2 className="text-3xl font-bold mb-6">
                        Recent Quizzes
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-6">

                        {data.recentAttempts.map((quiz) => (
                            <QuizCard
                                key={quiz._id}
                                quiz={quiz}
                            />
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    return (
        <div className={`${color} text-white rounded-xl p-6 shadow-lg`}>
            <p className="text-lg">{title}</p>
            <h2 className="text-4xl font-bold mt-3">{value}</h2>
        </div>
    );
};

export default Dashboard;