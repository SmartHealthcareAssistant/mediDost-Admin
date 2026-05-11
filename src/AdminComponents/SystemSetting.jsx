// src/components/SystemSettings.jsx
import React, { useState } from "react";
import { Cog6ToothIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const SystemSetting = () => {
  const [minDocs, setMinDocs] = useState(2);
  const [autoApprove, setAutoApprove] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [userRoles, setUserRoles] = useState({
    doctor: "Full Access",
    pharmacy: "Limited Access",
    patient: "Read Only",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Cog6ToothIcon className="h-7 w-7 text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
      </div>
      <p className="text-gray-600">Manage global parameters, user roles, and system policies.</p>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Verification Thresholds */}
        <div className="bg-gray-50 p-6 rounded-lg shadow space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Verification Thresholds</h3>
          <p className="text-sm text-gray-600">Minimum documents required for verification:</p>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              value={minDocs}
              min={1}
              max={10}
              onChange={(e) => setMinDocs(e.target.value)}
              className="w-20 p-2 border rounded-md text-gray-800"
            />
            <span className="text-gray-600">documents</span>
          </div>
          <label className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              checked={autoApprove}
              onChange={() => setAutoApprove(!autoApprove)}
              className="accent-indigo-600"
            />
            <span className="text-gray-700 text-sm">Enable Auto-Approval for Low-Risk Docs</span>
          </label>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow space-y-3 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <p className="text-sm text-gray-600">Manage system notifications:</p>
          <label className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-indigo-600"
            />
            <span className="text-gray-700 text-sm">Enable email alerts</span>
          </label>
        </div>

        {/* User Roles */}
        <div className="bg-gray-50 p-6 rounded-lg shadow space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">User Roles</h3>
          {Object.keys(userRoles).map((role) => (
            <div key={role} className="flex justify-between items-center">
              <span className="capitalize text-gray-700">{role}</span>
              <select
                value={userRoles[role]}
                onChange={(e) =>
                  setUserRoles({ ...userRoles, [role]: e.target.value })
                }
                className="p-2 border rounded-md text-gray-800"
              >
                <option>Full Access</option>
                <option>Limited Access</option>
                <option>Read Only</option>
              </select>
            </div>
          ))}
        </div>

        {/* Audit Warning */}
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 flex items-center space-x-3 col-span-full">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-700" />
          <p className="text-yellow-700 text-sm">
            Changes here affect all users. Proceed with caution.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemSetting;
