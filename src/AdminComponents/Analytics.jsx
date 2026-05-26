import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Users, Activity, CalendarRange, CreditCard } from "lucide-react";

// ===== API Base =====
const API_URL = "https://medidost-backend.onrender.com/api/admin/analytics";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    activeSessions: 0,
    newRegistrations: 0,
    totalAppointments: 0,
    totalRevenue: 0,

    monthlyActiveUsers: [],
    verificationStatus: [],
    registrationsByDept: [],
    specialtyData: [],
    appointmentStatusData: [],
  });

  // Load Analytics from Backend
  const fetchAnalytics = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      setData(result);
      setLoading(false);
    } catch (err) {
      console.error("Analytics load error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading)
    return <p className="p-6 text-gray-500 text-lg">Loading analytics...</p>;

  const stats = [
    {
      icon: <Users className="text-blue-600" size={24} />,
      label: "Total Users",
      value: data.totalUsers,
    },
    {
      icon: <CalendarRange className="text-purple-600" size={24} />,
      label: "Total Appointments",
      value: data.totalAppointments || 0,
    },
    {
      icon: <CreditCard className="text-green-600" size={24} />,
      label: "Total Revenue",
      value: `₹${data.totalRevenue || 0}`,
    },
    {
      icon: <Activity className="text-yellow-500" size={24} />,
      label: "Active Patients",
      value: data.activeSessions,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex items-center space-x-3 border border-gray-100 hover:shadow-md transition"
          >
            <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-lg font-bold text-gray-800">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Users & Specialty Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Monthly Active Users */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Monthly Active Users
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.monthlyActiveUsers || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Doctors by Specialty */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            Doctors by Specialty
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            {data.specialtyData && data.specialtyData.length > 0 ? (
              <BarChart data={data.specialtyData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6610F2" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
                No specialty data available.
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Verification Status & Appointment Statuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Department Breakdown */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            User Base Distribution
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.registrationsByDept || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Partner Verification Status
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.verificationStatus || []}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                paddingAngle={4}
                labelLine={false}
              >
                {(data.verificationStatus || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} accounts`, 'Status']} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 md:col-span-2 lg:col-span-1">
          <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Appointment Statuses
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            {data.appointmentStatusData && data.appointmentStatusData.length > 0 ? (
              <PieChart>
                <Pie
                  data={data.appointmentStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={4}
                  labelLine={false}
                >
                  {data.appointmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} slots`, 'Appointments']} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
              </PieChart>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
                No appointments booked yet.
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
