// src/components/VerificationList.jsx
import React, { useState } from "react";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";

const StatusBadge = ({ status }) => {
  const baseStyle =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
  switch (status) {
    case "Pending":
      return (
        <span
          className={`${baseStyle} bg-yellow-100 text-yellow-800 ring-yellow-600/20`}
        >
          <DocumentTextIcon className="h-3 w-3 mr-1" />
          Pending Review
        </span>
      );
    case "Approved":
      return (
        <span
          className={`${baseStyle} bg-green-100 text-green-800 ring-green-600/20`}
        >
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Approved
        </span>
      );
    case "Rejected":
      return (
        <span
          className={`${baseStyle} bg-red-100 text-red-800 ring-red-600/20`}
        >
          <XCircleIcon className="h-3 w-3 mr-1" />
          Rejected
        </span>
      );
    default:
      return null;
  }
};

const VerificationList = ({ type, dataList, setSelectedItem }) => {
  const [filter, setFilter] = useState("Pending");

  // ✅ Filter data
  const filteredList = dataList.filter((item) =>
    filter === "All" ? true : item.status === filter
  );

  const headers = {
    Doctor: [
      "Doctor Name",
      "Specialization",
      "License ID",
      "Phone",
      "Status",
      "Action",
    ],
    Pharmacy: [
      "Pharmacy Name",
      "Owner/Manager",
      "License ID",
      "Phone",
      "Status",
      "Action",
    ],
  };

  const renderData = (item) => {
    switch (type) {
      case "Doctor":
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-gray-700">
              {item.specialization || "—"}
            </td>
            <td className="px-6 py-4 text-gray-700">
              {item.license || "—"}
            </td>
            <td className="px-6 py-4 text-gray-700">{item.phone || "—"}</td>
          </>
        );
      case "Pharmacy":
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-gray-700">{item.owner}</td>
            <td className="px-6 py-4 text-gray-700">{item.license}</td>
            <td className="px-6 py-4 text-gray-700">{item.phone || "—"}</td>
          </>
        );
      default:
        return null;
    }
  };

  const filterButtons = [
    {
      label: "Pending",
      status: "Pending",
      count: dataList.filter((d) => d.status === "Pending").length,
      color: "yellow",
    },
    {
      label: "Approved",
      status: "Approved",
      count: dataList.filter((d) => d.status === "Approved").length,
      color: "green",
    },
    {
      label: "Rejected",
      status: "Rejected",
      count: dataList.filter((d) => d.status === "Rejected").length,
      color: "red",
    },
    {
      label: "All",
      status: "All",
      count: dataList.length,
      color: "indigo",
    },
  ];

  const colorMap = {
    yellow: {
      activeBg: "bg-yellow-600",
      activeText: "text-white",
      inactiveBg: "hover:bg-yellow-50",
      badgeActive: "bg-yellow-700",
    },
    green: {
      activeBg: "bg-green-600",
      activeText: "text-white",
      inactiveBg: "hover:bg-green-50",
      badgeActive: "bg-green-700",
    },
    red: {
      activeBg: "bg-red-600",
      activeText: "text-white",
      inactiveBg: "hover:bg-red-50",
      badgeActive: "bg-red-700",
    },
    indigo: {
      activeBg: "bg-indigo-600",
      activeText: "text-white",
      inactiveBg: "hover:bg-indigo-50",
      badgeActive: "bg-indigo-700",
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">
        {type} Document Verification
      </h2>

      {/* ✅ Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white rounded-xl shadow-lg">
        <FunnelIcon className="h-5 w-5 text-indigo-600" />
        <span className="font-medium text-gray-700 hidden sm:inline">
          Filter by Status:
        </span>
        {filterButtons.map((btn) => {
          const isActive = filter === btn.status;
          const c = colorMap[btn.color];

          return (
            <button
              key={btn.status}
              onClick={() => setFilter(btn.status)}
              className={`px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-1 transition duration-150
                ${isActive ? `${c.activeBg} ${c.activeText} shadow-md` : `text-gray-700 ${c.inactiveBg}`}`}
            >
              <span>{btn.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  isActive
                    ? `${c.badgeActive} text-white`
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {btn.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ✅ Main Table */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers[type].map((header, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                      index === headers[type].length - 1 ? "text-right" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-indigo-50/50 transition duration-150 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    {renderData(item)}
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        {item.status === "Pending"
                          ? "Review Docs"
                          : "View Details"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers[type].length}
                    className="px-6 py-8 text-center text-gray-500 italic"
                  >
                    No {filter.toLowerCase()} {type.toLowerCase()} requests
                    found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerificationList;
