 import React from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const { name, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden text-2xl text-gray-700 hover:text-indigo-600"
          >
            <FiMenu />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
              Q
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                QuizVerse
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Admin Dashboard
              </p>
            </div>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Admin Info */}
          <div className="hidden md:flex items-center gap-3">
            <FaUserCircle className="text-4xl text-indigo-600" />

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {name || "Administrator"}
              </h2>

              <p className="text-xs text-gray-500">
                Admin
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            <FiLogOut />

            <span className="hidden sm:block">
              Logout
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;