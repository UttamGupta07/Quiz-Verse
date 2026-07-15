import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import React from 'react'

const Userlayout = () => {
      const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>
            <Footer/>

        </div>

    )
}

export default Userlayout