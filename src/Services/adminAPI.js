const getBackendUrl = () => {
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000";
  }
  return "https://medidost-backend.onrender.com";
};

const API_URL = `${getBackendUrl()}/api/admin`;

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

export const fetchAnalytics = async (range = "all") => {
  const res = await fetch(`${API_URL}/analytics?range=${range}`);
  return res.json();
};

export const seedDemoData = async () => {
  const res = await fetch(`${API_URL}/seed-demo-data`, {
    method: "POST",
  });
  return res.json();
};
