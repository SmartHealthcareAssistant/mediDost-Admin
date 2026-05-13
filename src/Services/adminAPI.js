const API_URL = "https://medidost-backend.onrender.com/api/admin";

// Fetch doctors
export const fetchDoctors = async () => {
  const res = await fetch(`${API_URL}/doctor`);
  return res.json();
};

// Verify doctor
export const verifyDoctor = async (id, status, reason = "") => {
  const res = await fetch(`${API_URL}/verify/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, reason }),
  });
  return res.json();
};

// Fetch pharmacies
export const fetchPharmacies = async () => {
  const res = await fetch(`${API_URL}/pharmacy`);
  return res.json();
};

// Verify pharmacy
export const verifyPharmacy = async (id, status, reason = "") => {
  const res = await fetch(`${API_URL}/verify-pharmacy/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, reason }),
  });
  return res.json();
};

// Fetch patients
export const fetchPatients = async () => {
  const res = await fetch(`${API_URL}/patients`);
  return res.json();
};

// Toggle patient activation/deactivation
export const togglePatientStatus = async (id) => {
  const res = await fetch(`${API_URL}/patient/toggle/${id}`, {
    method: "PUT",
  });
  return res.json();
};

export const fetchAnalytics = async () => {
  const res = await fetch("https://medidost-backend.onrender.com/api/admin/analytics");
  return res.json();
};
