 import React from "react";
import {
  FaHome,
  FaQuestionCircle,
  FaLayerGroup,
  FaUsers,
  FaChartBar,
  FaCog,
  FaClipboardList,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/admin",
    },
    {
      title: "Questions",
      icon: <FaQuestionCircle />,
      path: "/admin/questions",
    },
    {
      title: "Categories",
      icon: <FaLayerGroup />,
      path: "/admin/categories",
    },
    {
      title: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      title: "Quiz Attempts",
      icon: <FaClipboardList />,
      path: "/admin/attempts",
    },
    {
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-64
          bg-slate-900
          text-white
          z-40
          transform
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-700">
          <h1 className="text-xl font-bold">
            QuizVerse
          </h1>

          <button
            className="lg:hidden text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">

          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-800 text-gray-300"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span>{item.title}</span>
            </NavLink>
          ))}

        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 w-full px-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            <FaSignOutAlt />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;