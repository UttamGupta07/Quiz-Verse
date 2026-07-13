 import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuth();

  const isLoggedIn = token; // Replace with your auth state

  const navItem = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-indigo-600"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-indigo-600"
        >
          QuizMaster
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <NavLink to="/" className={navItem}>
            Home
          </NavLink>

          <NavLink to="/categories" className={navItem}>
            Categories
          </NavLink>

          <NavLink to="/leaderboard" className={navItem}>
            Leaderboard
          </NavLink>

          <NavLink to="/about" className={navItem}>
            About
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="font-medium hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="w-10 h-10 rounded-full border"
              />
               <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-indigo-600"
                onClick={()=>{logout()}}
                
                
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-indigo-600"
                
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t">

          <NavLink
            to="/"
            className="block px-6 py-4 hover:bg-gray-100"
          >
            Home
          </NavLink>

          <NavLink
            to="/categories"
            className="block px-6 py-4 hover:bg-gray-100"
          >
            Categories
          </NavLink>

          <NavLink
            to="/leaderboard"
            className="block px-6 py-4 hover:bg-gray-100"
          >
            Leaderboard
          </NavLink>

          <NavLink
            to="/about"
            className="block px-6 py-4 hover:bg-gray-100"
          >
            About
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className="block px-6 py-4 hover:bg-gray-100"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block px-6 py-4 bg-indigo-600 text-white"
              >
                Sign Up
              </NavLink>
            </>
          )}

        </div>
      )}
    </header>
  );
};

export default Navbar;