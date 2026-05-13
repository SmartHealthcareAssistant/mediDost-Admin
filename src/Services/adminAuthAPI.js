const API_URL =  "https://medidost-backend.onrender.com/api/admin/auth";

export const registerAdmin = async (adminData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server Error: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ registerAdmin error:", error);
    return { message: "Network or Server error" };
  }
};


export const loginAdmin = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ loginAdmin error:", error);
    return { message: "Network error" };
  }
};

