import React, { useState, useEffect } from "react";
import { UserIcon, MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
import { fetchPatients, togglePatientStatus } from "../Services/adminAPI";
import socket from "../socket"; // ✅ GLOBAL SOCKET INSTANCE

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 Load patient list on mount
  useEffect(() => {
    loadPatients();

    // 🔥 Real-time patient activation/deactivation event
    socket.on("patientStatusChanged", (data) => {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === data.id ? { ...p, active: data.active } : p
        )
      );
    });

    // Cleanup socket listener
    return () => {
      socket.off("patientStatusChanged");
    };
  }, []);

  // Fetch patients
  const loadPatients = async () => {
    const data = await fetchPatients();
    setPatients(data);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 Toggle active/deactive
  const toggleActiveStatus = async (id) => {
    const result = await togglePatientStatus(id);

    if (result.success) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, active: result.active } : p
        )
      );
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-3xl font-bold text-gray-900">Patient Management</h2>

        <div className="relative w-full md:w-1/3">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Identifier</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-3 flex items-center gap-2">
                    <UserIcon className="h-6 w-6 text-indigo-500" />
                    {p.name}
                  </td>

                  <td className="px-6 py-3">{p.email}</td>
                  <td className="px-6 py-3">{p.identifier}</td>

                  <td className="px-6 py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        p.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.active ? "Active" : "Deactivated"}
                    </span>
                  </td>

                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => toggleActiveStatus(p.id)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${
                        p.active ? "bg-red-500 text-white" : "bg-green-500 text-white"
                      }`}
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      {p.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patient;
