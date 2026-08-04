 import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!token;

  const navItem = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-indigo-600"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-indigo-600"
          onClick={closeMenu}
        >
          QuizMaster
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
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

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-5 lg:flex">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" className={navItem}>
                Dashboard
              </NavLink>

              <NavLink to="/profile" className={navItem}>
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="font-medium text-red-600 transition hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navItem}>
                Login
              </NavLink>

              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 lg:hidden"
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <NavLink
            to="/"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/categories"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Categories
          </NavLink>

          <NavLink
            to="/leaderboard"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Leaderboard
          </NavLink>

          <NavLink
            to="/about"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <hr />

          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                className="block px-6 py-4 hover:bg-gray-100"
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className="block px-6 py-4 hover:bg-gray-100"
                onClick={closeMenu}
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="block w-full px-6 py-4 text-left font-medium text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block px-6 py-4 hover:bg-gray-100"
                onClick={closeMenu}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="block bg-indigo-600 px-6 py-4 text-white hover:bg-indigo-700"
                onClick={closeMenu}
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