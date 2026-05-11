import React from "react";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const StatusBadge = ({ status }) => {
  const base =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";

  switch (status) {
    case "Pending":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-800 ring-yellow-600/20`}>
          <DocumentTextIcon className="h-3 w-3 mr-1" />
          Pending Review
        </span>
      );
    case "Approved":
      return (
        <span className={`${base} bg-green-100 text-green-800 ring-green-600/20`}>
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Access Granted
        </span>
      );
    case "Rejected":
      return (
        <span className={`${base} bg-red-100 text-red-800 ring-red-600/20`}>
          <XCircleIcon className="h-3 w-3 mr-1" />
          Rejected
        </span>
      );
    default:
      return null;
  }
};

const DetailModal = ({ item, setSelectedItem, handleVerification }) => {
  const type = item.specialization ? "Doctor" : "Pharmacy";
  const BASE_URL = "http://localhost:5000";

  // ---------------------------------------
  // DOCUMENT MAP INCLUDING LICENSE
  // ---------------------------------------
  const documentMap = {
    idProof: "ID Proof",
    degree: "Degree Certificate",
    certificates: "Additional Certificates",
    license: "Doctor License", // license now appears ONLY here
  };

  const documents = Object.keys(documentMap).filter((key) => item[key]);

  const handleAction = (status) => {
    const reason =
      status === "Rejected"
        ? prompt(`Enter rejection reason for ${item.name}:`)
        : "N/A";

    if (status === "Rejected" && !reason) return;

    handleVerification(item.id, type, status, reason);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">

        {/* ---------------- HEADER ---------------- */}
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold text-indigo-700">Review {item.name}</h3>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* ---------------- BASIC DETAILS (LICENSE REMOVED) ---------------- */}
        <div className="space-y-2 text-gray-700 mb-6">
          {type === "Doctor" ? (
            <>
              <p><b>Specialization:</b> {item.specialization}</p>
              {/* LICENSE REMOVED FROM HERE */}
            </>
          ) : (
            <>
              <p><b>Pharmacy Name:</b> {item.pharmacyName || item.name}</p>
              <p><b>Owner:</b> {item.name}</p>
              <p><b>License Number:</b> {item.licenseNumber}</p>
            </>
          )}

          <p><b>Phone:</b> {item.phone || item.pharmaPhone}</p>
          <p><b>Status:</b> <StatusBadge status={item.status} /></p>
        </div>

        {/* ---------------- SUBMITTED DOCUMENTS ---------------- */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <DocumentTextIcon className="h-5 w-5 text-indigo-500" />
            Submitted Documents
          </h3>

          <div className="bg-gray-50 p-4 border rounded-xl space-y-3 shadow-sm">
            {documents.length > 0 ? (
              documents.map((key) => (
                <div
                  key={key}
                  className="flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm"
                >
                  <span>{documentMap[key]}</span>

                  <a
                    href={`${BASE_URL}${item[key]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No documents uploaded.</p>
            )}
          </div>
        </div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <div className="border-t pt-4 flex justify-end space-x-3 mt-6">
          {item.status === "Pending" ? (
            <>
              <button
                onClick={() => handleAction("Rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                <XCircleIcon className="h-5 w-5 mr-1" /> Reject
              </button>

              <button
                onClick={() => handleAction("Approved")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <CheckCircleIcon className="h-5 w-5 mr-1" /> Approve
              </button>
            </>
          ) : (
            <StatusBadge status={item.status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
