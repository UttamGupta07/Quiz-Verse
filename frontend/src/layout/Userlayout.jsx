import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate,Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import React, { useEffect } from 'react'

const Userlayout = () => {
    const navigate=useNavigate()
     
     const role=localStorage.getItem("role");
     useEffect(()=>{

             if(role=="admin"){
        navigate("/notfound");
        return;
     }

     },[]);

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