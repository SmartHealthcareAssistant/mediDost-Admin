import React, { createContext, useState, useContext, useEffect } from "react";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  // Load email of the currently logged-in admin
  const currentAdminEmail = localStorage.getItem("adminEmail");

  // Try to load profile for that specific admin
  const storedAdmin =
    (currentAdminEmail &&
      JSON.parse(localStorage.getItem(`adminProfile_${currentAdminEmail}`))) || {
      name: "Admin User",
      email: currentAdminEmail || "admin@smarthealth.com",
      role: "Administrator",
      photo: null,
    };

  const [admin, setAdmin] = useState(storedAdmin);

  // 🧠 Whenever admin changes, save profile for the current email
  useEffect(() => {
    if (admin?.email) {
      localStorage.setItem(`adminProfile_${admin.email}`, JSON.stringify(admin));
    }
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
