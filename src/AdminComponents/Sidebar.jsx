// src/components/layout/Sidebar.jsx
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import ShaLogo from "./ShaLogo";
import {
  UserGroupIcon,
  HomeModernIcon,
  UserIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  XMarkIcon,
  ChartBarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast"; // ✅ Import toast

const Sidebar = ({ activeTab, setActiveTab, data, isSidebarOpen, setIsSidebarOpen }) => {
  const tabs = [
    { name: "Dashboard", icon: Squares2X2Icon, key: "Dashboard" },
    { name: "Doctor Verification", icon: UserGroupIcon, key: "Doctor" },
    { name: "Pharmacy Verification", icon: HomeModernIcon, key: "Pharmacy" },
    { name: "Patient", icon: UserIcon, key: "Patient" },
    { name: "System Settings", icon: Cog6ToothIcon, key: "Settings" },
    { name: "Analytics", icon: ChartBarIcon, key: "Analytics" },
    { name: "Profile", icon: UserCircleIcon, key: "Profile" },
  ];

  const getPendingCount = (key) => {
    if (key === "Doctor") return data.doctors.filter((d) => d.status === "Pending").length;
    if (key === "Pharmacy") return data.pharmacies.filter((p) => p.status === "Pending").length;
    return 0;
  };

// inside Sidebar component (logout handler)
const handleLogout = () => {
  toast.success("Logged out successfully!");
  const email = localStorage.getItem("adminEmail");
  if (email) {
    localStorage.removeItem(`adminProfile_${email}`);
  }
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminName");
  localStorage.removeItem("adminEmail");

  setTimeout(() => (window.location.href = "/admin/login"), 800);
};


  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-indigo-800 text-white w-64 z-40 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <div className="flex items-center space-x-2">
            <ShaLogo />
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 text-indigo-200 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center w-full p-3 rounded-lg transition ${
                activeTab === tab.key
                  ? "bg-indigo-700 font-semibold"
                  : "hover:bg-indigo-700 hover:bg-opacity-70"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-3" />
              {tab.name}
              {getPendingCount(tab.key) > 0 &&
                ["Doctor", "Pharmacy", "Patient"].includes(tab.key) && (
                  <span className="ml-auto inline-flex items-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                    {getPendingCount(tab.key)}
                  </span>
                )}
            </button>
          ))}
        </nav>

        {/* ✅ Logout button with toast */}
        <div className="mt-8">
          <a
            onClick={handleLogout}
            className="flex items-center p-3 text-rose-400 hover:bg-rose-600 hover:text-white cursor-pointer transition"
          >
            <FaSignOutAlt className="mr-4" />
            Logout
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
