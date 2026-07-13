import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const {login,logout}=useAuth();
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const url =
      role === "user"
        ? "http://localhost:3030/user/login"
        : "http://localhost:3030/admin/login";

    try {
      const res = await axios.post(url, {
        email,
        password,
      });

      // Save token
      login(res.data);
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("role", role);
      // localStorage.setItem("id",res.data.user.id);
      // localStorage.setItem("name",res.data.user.name);

      alert(res.data.message);

      // Redirect
      if (role === "user") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h1>

        {/* Role Selection */}
        <div className="flex justify-center gap-8 mb-6">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
              className="accent-indigo-600"
            />
            User Login
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
              className="accent-indigo-600"
            />
            Admin Login
          </label>

        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            {role === "user" ? "User Login" : "Admin Login"}
          </button>

        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;