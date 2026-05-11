import React, { useState } from "react";
import { loginAdmin } from "../Services/adminAuthAPI";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import adminLoginImg from "../assets/admin-login.png"; // make sure image path is correct

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAdmin(form);

    if (res.token) {
      toast.success("Welcome back, Admin!");
      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("adminName", res.admin.name);
      localStorage.setItem("adminEmail", res.admin.email);
      navigate("/admin/dashboard");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-white via-blue-50 to-teal-100 overflow-hidden">

      {/* LEFT IMAGE SIDE */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden w-[90%] md:w-[900px] max-w-[95%]"
      >
        <div className="w-[500px]">
        <img
          src={adminLoginImg}
          alt="Admin login illustration"
          className="w-full drop-shadow-xl h-full"
        />
        </div>
      
      {/* RIGHT FORM SIDE */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Admin Portal Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 rounded-md shadow-md hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/admin/register"
            className="text-teal-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
