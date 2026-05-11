import React, { useState, useEffect } from "react";
import socket from "../socket"; // GLOBAL SOCKET

import Layout from "./Layout";
import HomeDashboard from "./HomeDashboard";
import VerificationList from "./VerificationList";
import DetailModal from "./DetailModal";
import Analytics from "./Analytics";
import SystemSetting from "./SystemSetting";
import AdminProfile from "./AdminProfile";
import Patient from "./Patient";

import {
  fetchDoctors,
  verifyDoctor,
  fetchPharmacies,
  verifyPharmacy,
} from "../Services/adminAPI";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [data, setData] = useState({ doctors: [], pharmacies: [] });
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState("");

  // ------------------------------------
  // LOAD INITIAL DATA
  // ------------------------------------
  useEffect(() => {
    const loadData = async () => {
      let doctors = await fetchDoctors();
      let pharmacies = await fetchPharmacies();

      if (!Array.isArray(doctors)) doctors = [];
      if (!Array.isArray(pharmacies)) pharmacies = [];

      setData({ doctors, pharmacies });
    };

    loadData();
  }, []);

  // ------------------------------------
  // SOCKET LISTENERS
  // ------------------------------------
  useEffect(() => {
    // Patient registered
    socket.on("newPatientRegistered", (data) => {
      setToast(`New patient registered: ${data.name}`);
      setTimeout(() => setToast(""), 3000);
    });

    // New doctor signup
    socket.on("newDoctorRegistered", (data) => {
      setToast(`New doctor registered: ${data.name}`);
      setTimeout(() => setToast(""), 3000);

      fetchDoctors().then((doctors) =>
        setData((prev) => ({ ...prev, doctors }))
      );
    });

    // ---------------------------------------------------
    // 🔥 Doctor completed profile — fetch full details
    // ---------------------------------------------------
    socket.on("doctorProfileCompleted", () => {
      fetchDoctors().then((doctors) =>
        setData((prev) => ({ ...prev, doctors }))
      );

      setToast(`A doctor completed their profile`);
      setTimeout(() => setToast(""), 3000);
    });

    // Pharmacy registered
    socket.on("newPharmacyRegistered", (data) => {
      setToast(`New pharmacy registered: ${data.name}`);
      setTimeout(() => setToast(""), 3000);

      fetchPharmacies().then((pharmacies) =>
        setData((prev) => ({ ...prev, pharmacies }))
      );
    });

    // Patient status update
    socket.on("patientStatusChanged", (data) => {
      setToast(
        data.active
          ? `Patient Activated: ${data.name}`
          : `Patient Deactivated: ${data.name}`
      );
      setTimeout(() => setToast(""), 3000);
    });

    return () => {
      socket.off("newPatientRegistered");
      socket.off("patientStatusChanged");
      socket.off("newDoctorRegistered");
      socket.off("newPharmacyRegistered");
      socket.off("doctorProfileCompleted");
    };
  }, []);

  // ------------------------------------
  // VERIFY DOCTOR or PHARMACY
  // ------------------------------------
  const handleVerification = async (id, type, newStatus, reason) => {
    if (newStatus === "Rejected" && (!reason || reason.trim() === "")) {
      alert("Rejection reason required");
      return;
    }

    try {
      let result =
        type === "Doctor"
          ? await verifyDoctor(id, newStatus, reason)
          : await verifyPharmacy(id, newStatus, reason);

      if (!result.success) {
        alert(result.message || "Verification failed");
        return;
      }

      const key = type === "Doctor" ? "doctors" : "pharmacies";

      setData((prev) => ({
        ...prev,
        [key]: prev[key].map((item) =>
          item.id === id
            ? { ...item, status: newStatus, rejectionReason: reason }
            : item
        ),
      }));

      setToast(
        `${type}: ${
          newStatus === "Approved"
            ? "Access granted & email sent."
            : "Updated & email sent."
        }`
      );
      setTimeout(() => setToast(""), 3000);

      setSelectedItem(null);
      setActiveTab(type);
    } catch (err) {
      console.error(err);
      alert("Server error during verification");
    }
  };

  // ------------------------------------
  // TAB RENDERER
  // ------------------------------------
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <HomeDashboard data={data} setActiveTab={setActiveTab} />;
      case "Doctor":
        return (
          <VerificationList
            type="Doctor"
            dataList={data.doctors}
            setSelectedItem={setSelectedItem}
          />
        );
      case "Pharmacy":
        return (
          <VerificationList
            type="Pharmacy"
            dataList={data.pharmacies}
            setSelectedItem={setSelectedItem}
          />
        );
      case "Patient":
        return <Patient />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <SystemSetting />;
      case "Profile":
        return <AdminProfile />;
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} data={data}>
      {toast && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
          {toast}
        </div>
      )}

      {renderContent()}

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={selectedItem.specialization ? "Doctor" : "Pharmacy"}
          setSelectedItem={setSelectedItem}
          handleVerification={handleVerification}
        />
      )}
    </Layout>
  );
};

export default AdminDashboard;
