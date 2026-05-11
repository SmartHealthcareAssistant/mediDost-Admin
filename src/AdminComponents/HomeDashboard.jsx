// src/components/HomeDashboard.jsx
import React, { useState } from "react";
import { UserGroupIcon, HomeModernIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

const HomeDashboard = ({ data, setActiveTab }) => {
  const [notes, setNotes] = useState("");

  const totalPending =
    data.doctors.filter((d) => d.status === "Pending").length +
    data.pharmacies.filter((p) => p.status === "Pending").length 

  const cards = [
    {
      title: "Total Pending Verifications",
      value: totalPending,
      icon: DocumentTextIcon,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Doctor Docs Pending",
      value: data.doctors.filter((d) => d.status === "Pending").length,
      icon: UserGroupIcon,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      tab: "Doctor",
    },
    {
      title: "Pharmacy Docs Pending",
      value: data.pharmacies.filter((p) => p.status === "Pending").length,
      icon: HomeModernIcon,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      tab: "Pharmacy",
    },
  ];

  return (
    <div className="space-y-10 p-4 md:p-8 bg-gray-100 min-h-screen">

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => card.tab && setActiveTab(card.tab)}
            className={`p-6 rounded-2xl shadow-lg transition transform hover:scale-105 cursor-pointer ${card.bg}`}
          >
            <div className="flex flex-col justify-between items-center gap-2">
              <card.icon className={`h-10 w-10 ${card.color}`} />
              <p className="text-lg font-medium text-gray-600">{card.title}</p>
              
            </div>
            <p className=" text-center text-4xl font-bold mt-3 text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Extra Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Announcements</h3>
          <ul className="space-y-3">
            <li className="p-3 border rounded-lg hover:bg-gray-50 transition">
              New healthcare guidelines released.{" "}
              <span className="text-gray-400 text-xs">Oct 7, 2025</span>
            </li>
            <li className="p-3 border rounded-lg hover:bg-gray-50 transition">
              System maintenance scheduled at 11 PM tonight.{" "}
              <span className="text-gray-400 text-xs">Oct 6, 2025</span>
            </li>
          </ul>
        </div>

        {/* To-Do List */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Admin To-Do List</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="accent-indigo-500" />
                <span>Review pending pharmacy documents</span>
              </div>
              <span className="text-xs text-gray-400">Due Today</span>
            </li>
            <li className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="accent-indigo-500" />
                <span>Update system settings</span>
              </div>
              <span className="text-xs text-gray-400">Due Tomorrow</span>
            </li>
          </ul>
        </div>

        {/* Quick Notes */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your notes here..."
          />
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 self-start shadow">
            Save Notes
          </button>
        </div>
         {/* System Health & Admin Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* System Health */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">System Health</h3>
            <div className="p-4 bg-green-50 rounded-lg text-green-700 font-medium">Server Status: Online</div>
            <div className="p-4 bg-yellow-50 rounded-lg text-yellow-700 font-medium">API Latency: 120ms</div>
            <div className="p-4 bg-red-50 rounded-lg text-red-700 font-medium">Pending Updates: 2</div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default HomeDashboard;