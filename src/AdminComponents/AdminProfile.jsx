import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useAdmin } from "./AdminContext";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const { admin, setAdmin } = useAdmin(); // ✅ access context
  const [profile, setProfile] = useState(admin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfile({ ...profile, photo: preview });
    }
  };

  const handleSave = () => {
    setAdmin(profile); // ✅ update global context
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Admin Profile</h2>

      {/* Profile Photo */}
      <div className="flex items-center space-x-6">
        <div className="relative w-24 h-24">
          <img
            src={profile.photo || "https://via.placeholder.com/150?text=Admin+Photo"}
            alt="Admin Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700">
            <CameraIcon className="h-5 w-5 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-gray-500">{profile.email}</p>
          <p className="text-gray-500">{profile.role}</p>
        </div>
      </div>

      {/* Editable Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
