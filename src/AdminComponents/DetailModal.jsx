import React, { useState } from "react";
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
  const BASE_URL = "https://medidost-backend.onrender.com";

  // Rejection states
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectError, setRejectError] = useState("");

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
    handleVerification(item.id, type, status, "N/A");
  };

  const confirmRejection = () => {
    if (!rejectionReason.trim()) {
      setRejectError("Rejection reason is required.");
      return;
    }
    handleVerification(item.id, type, "Rejected", rejectionReason.trim());
  };

  return (
    <div className="fixed inset-0 bg-gray-650 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">

        {/* ---------------- HEADER ---------------- */}
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold text-indigo-700">Review {item.name}</h3>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none cursor-pointer focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* ---------------- BASIC DETAILS ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
          {type === "Doctor" ? (
            <div>
              <p className="mb-1.5"><b className="text-gray-500 font-medium">Specialization:</b> <span className="font-semibold text-gray-800">{item.specialization}</span></p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p><b className="text-gray-500 font-medium">Pharmacy Name:</b> <span className="font-semibold text-gray-800">{item.pharmacyName || item.name}</span></p>
              <p><b className="text-gray-500 font-medium">Owner:</b> <span className="font-semibold text-gray-800">{item.name}</span></p>
              <p><b className="text-gray-500 font-medium">License Number:</b> <span className="font-semibold text-gray-800">{item.licenseNumber}</span></p>
            </div>
          )}

          <div className="space-y-1.5">
            <p><b className="text-gray-500 font-medium">Phone:</b> <span className="font-semibold text-gray-800">{item.phone || item.pharmaPhone}</span></p>
            <div className="flex items-center gap-1.5">
              <b className="text-gray-500 font-medium">Status:</b> 
              <StatusBadge status={item.status} />
            </div>
          </div>
        </div>

        {/* ---------------- SUBMITTED DOCUMENTS ---------------- */}
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-850">
            <DocumentTextIcon className="h-5 w-5 text-indigo-500" />
            Submitted Documents
          </h3>

          <div className="bg-gray-50 p-4 border border-slate-100 rounded-xl space-y-3 shadow-xs">
            {documents.length > 0 ? (
              documents.map((key) => (
                <div
                  key={key}
                  className="flex justify-between items-center bg-white p-3 rounded-lg border shadow-xs text-sm"
                >
                  <span className="font-medium text-gray-700">{documentMap[key]}</span>

                  <a
                    href={item[key].startsWith("http") ? item[key] : `${BASE_URL}${item[key]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-650 hover:text-indigo-900 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    View Document &rarr;
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-sm">No documents uploaded.</p>
            )}
          </div>
        </div>

        {/* Rejection Form Box */}
        {showRejectInput && (
          <div className="bg-red-50/50 border border-red-200 p-4 rounded-xl mt-6 space-y-3 animate-fadeIn">
            <label className="block text-sm font-bold text-red-800">
              Provide Rejection Reason
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                setRejectError("");
              }}
              placeholder="e.g. Uploaded degree certificate is blurred or license number is incorrect."
              className="w-full border border-red-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white bg-white/70 text-gray-700 min-h-[90px]"
            />
            {rejectError && <p className="text-red-600 text-xs font-semibold">{rejectError}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowRejectInput(false);
                  setRejectionReason("");
                  setRejectError("");
                }}
                className="px-3.5 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-150 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmRejection}
                className="px-3.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
              >
                <XCircleIcon className="h-4 w-4" /> Confirm Rejection
              </button>
            </div>
          </div>
        )}

        {/* ---------------- ACTION BUTTONS ---------------- */}
        {!showRejectInput && (
          <div className="border-t pt-4 flex justify-end space-x-3 mt-6">
            {item.status === "Pending" ? (
              <>
                <button
                  onClick={() => setShowRejectInput(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center text-sm font-semibold transition shadow-sm active:scale-95 cursor-pointer animate-pulse"
                >
                  <XCircleIcon className="h-5 w-5 mr-1.5" /> Reject
                </button>

                <button
                  onClick={() => handleAction("Approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm font-semibold transition shadow-sm active:scale-95 cursor-pointer"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-1.5" /> Approve
                </button>
              </>
            ) : (
              <StatusBadge status={item.status} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailModal;
