import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "@/utils/api";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://backend-gnpawsentials.onrender.com/api/admin/login`, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token); //for saving jwt
      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition transform hover:-translate-y-1 cursor-pointer"
          >
            Login
          </button>

           <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-xl border border-indigo-600 text-indigo-400 font-semibold mt-3 hover:bg-indigo-600/10 hover:text-indigo-300 transition transform hover:-translate-y-1 cursor-pointer"
            >
            Register
            </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Forgot password?{" "}
          <a href="#" className="text-indigo-400 hover:underline">
            Reset
          </a>
        </p>
      </div>
    </div>
  );
}
