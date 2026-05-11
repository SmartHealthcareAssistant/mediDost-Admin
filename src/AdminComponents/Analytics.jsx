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
import { Users, UserCheck, Activity, ClipboardList } from "lucide-react";

// ===== API Base =====
const API_URL = "http://localhost:5000/api/admin/analytics";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    activeSessions: 0,
    newRegistrations: 0,

    monthlyActiveUsers: [],
    verificationStatus: [],
    registrationsByDept: [],
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
      icon: <UserCheck className="text-green-600" size={24} />,
      label: "Verified Users",
      value: data.verifiedUsers,
    },
    {
      icon: <Activity className="text-yellow-500" size={24} />,
      label: "Active Sessions",
      value: data.activeSessions,
    },
    {
      icon: <ClipboardList className="text-purple-600" size={24} />,
      label: "New Registrations",
      value: data.newRegistrations,
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
              <p className="text-xs text-gray-500">{stat.label}</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <h4 className="font-semibold text-gray-700 mb-2">
            Monthly Active Users
          </h4>
          <ResponsiveContainer width="100%" height={250}>
<LineChart data={data.monthlyActiveUsers || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <h4 className="font-semibold text-gray-700 mb-2">
            Verification Status
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data.verificationStatus || []} dataKey="value" outerRadius={80} label>
               {(data.verificationStatus || []).map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <h4 className="font-semibold text-gray-700 mb-2">
            Registrations by Department
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.registrationsByDept}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6610F2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
