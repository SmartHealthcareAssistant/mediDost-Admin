import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAdmin } from "./AdminContext";

const Header = ({ setIsSidebarOpen, activeTab }) => {
  const { admin } = useAdmin(); // ✅ access admin info

  return (
    <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-20">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="md:hidden p-2 text-indigo-600 hover:text-indigo-800"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
        {activeTab === "Dashboard" ? "Admin Overview" : `${activeTab} Management`}
      </h1>

      {/* ✅ Profile Section */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {admin.photo ? (
            <img
              src={admin.photo}
              alt="Admin"
              className="w-8 h-8 rounded-full border-2 border-indigo-500 object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              {admin.name?.charAt(0) || "A"}
            </div>
          )}
          <span className="hidden sm:inline text-sm text-gray-700 font-medium">
            {admin.name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
