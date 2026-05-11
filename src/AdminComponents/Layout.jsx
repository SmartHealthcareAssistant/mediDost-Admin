// src/components/layout/Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, activeTab, setActiveTab, data }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={data}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col md:ml-64 transition-all">
        <Header activeTab={activeTab} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="p-4 md:p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
