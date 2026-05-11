import React, { useState } from "react";
import { registerAdmin } from "../Services/adminAuthAPI";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import adminRegisterImg from "../assets/admin-registration.png"; // your image path

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerAdmin(form);

    if (res.message === "Admin registered successfully") {
      toast.success("Registration successful! Please login.");
      navigate("/admin/login");
    } else {
      toast.error(res.message || "Failed to register");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] via-[#bbdefb] to-[#90caf9] relative overflow-hidden"
    >
      {/* soft gradient circles */}
      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-blue-200 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-teal-300 opacity-40 blur-3xl rounded-full"></div>

      {/* Unified Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden w-[90%] md:w-[900px] max-w-[95%]"
      >
        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={adminRegisterImg}
            alt="Admin Illustration"
            className="w-full rounded-xl shadow-lg h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
            Create Admin Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-700 text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Choose a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-[1.02] transition-transform"
            >
              Register Now
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already registered?{" "}
            <Link
              to="/admin/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
