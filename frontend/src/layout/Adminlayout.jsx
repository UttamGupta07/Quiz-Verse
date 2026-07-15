import React, { useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Adminlayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <AdminNavbar
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Adminlayout;