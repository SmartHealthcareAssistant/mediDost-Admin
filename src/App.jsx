import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./Pages/AdminLogin";
import AdminRegister from "./Pages/AdminRegister";
import AdminDashboard from "./AdminComponents/AdminDashboard";
import AdminPrivateRoute from "./AdminComponents/AdminPrivateRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
    </>
  );
}

export default App;
