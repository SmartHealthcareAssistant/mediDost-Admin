import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const NotificationButton = ({ notifications = [], onSelect }) => {
  return (
    <div className="relative">
      <button className="relative flex items-center p-2 rounded bg-blue-500 text-white">
        <BellIcon className="h-6 w-6 mr-1" />
        Notifications
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {notifications.length}
          </span>
        )}
      </button>

      {notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl z-50 max-h-96 overflow-y-auto">
          {notifications.map((n, i) => (
            <div
              key={i}
              className="p-3 border-b cursor-pointer hover:bg-gray-50"
              onClick={() => onSelect(n)}
            >
              <p className="text-sm font-medium text-gray-800">{n.name}</p>
              <p className="text-xs text-gray-500">New {n.type} submission</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
