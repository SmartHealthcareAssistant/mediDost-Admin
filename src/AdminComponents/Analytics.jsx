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
  AreaChart,
  Area
} from "recharts";
import { Users, Activity, CalendarRange, CreditCard, RefreshCw, Database } from "lucide-react";
import { fetchAnalytics, seedDemoData } from "../Services/adminAPI";
import toast from "react-hot-toast";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7days"); // Default to Last 7 Days for a granular local look
  const [trendTab, setTrendTab] = useState("traffic"); // 'traffic' or 'revenue'
  const [seeding, setSeeding] = useState(false);

  const [data, setData] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    activeSessions: 0,
    metrics: {
      users: { count: 0, delta: 0 },
      appointments: { count: 0, delta: 0 },
      revenue: { count: 0, delta: 0 },
      active: { count: 0, delta: 0 }
    },
    trendData: [],
    verificationStatus: [],
    registrationsByDept: [],
    specialtyData: [],
    appointmentStatusData: []
  });

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  // Load Analytics from backend
  const loadAnalyticsData = async (selectedRange) => {
    try {
      setLoading(true);
      const result = await fetchAnalytics(selectedRange);
      setData(result);
      setLoading(false);
    } catch (err) {
      console.error("Analytics load error:", err);
      toast.error("Failed to load analytics data");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData(range);
  }, [range]);

  const handleSeed = async () => {
    try {
      setSeeding(true);
      const res = await seedDemoData();
      if (res.success) {
        toast.success(res.message);
        loadAnalyticsData(range);
      } else {
        toast.error(res.message || "Failed to seed data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during seeding");
    } finally {
      setSeeding(false);
    }
  };

  if (loading && !data.trendData.length) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96 space-y-3">
        <RefreshCw className="animate-spin text-blue-600" size={32} />
        <p className="text-gray-500 text-lg font-medium">Fetching real-time analytics...</p>
      </div>
    );
  }

  // Stats Card Layout
  const stats = [
    {
      icon: <Users className="text-blue-600" size={24} />,
      label: "Total Registered Users",
      value: data.totalUsers,
      metricKey: "users",
      prefix: "",
      subtext: "cumulative accounts"
    },
    {
      icon: <CalendarRange className="text-purple-600" size={24} />,
      label: "Total Bookings",
      value: data.totalAppointments,
      metricKey: "appointments",
      prefix: "",
      subtext: "appointments booked"
    },
    {
      icon: <CreditCard className="text-green-600" size={24} />,
      label: "Total Revenue",
      value: `₹${data.totalRevenue.toLocaleString("en-IN")}`,
      metricKey: "revenue",
      prefix: "₹",
      subtext: "paid transactions"
    },
    {
      icon: <Activity className="text-yellow-500" size={24} />,
      label: "Active Patients",
      value: data.activeSessions,
      metricKey: "active",
      prefix: "",
      subtext: "active profile logins"
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Header Row with Filters and Seed Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitor real-world usage metrics, revenue, and registration parameters
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Seeding Button - Only in localhost */}
          {isLocalhost && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Database size={16} />
              {seeding ? "Seeding..." : "Seed Demo Data"}
            </button>
          )}

          {/* Time range selector */}
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Top Row: Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const metric = data.metrics?.[stat.metricKey] || { count: 0, delta: 0 };
          const isPositive = metric.delta >= 0;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                <div className="p-2.5 bg-gray-50 rounded-xl">{stat.icon}</div>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{stat.value}</h3>

                {/* Percentage Growth Badge */}
                <div className="flex items-center mt-2 space-x-1.5">
                  {range === "all" ? (
                    <span className="text-xs text-gray-400 font-medium">All-time record</span>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                          isPositive
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {isPositive ? `+${metric.delta}%` : `${metric.delta}%`}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {stat.metricKey === "revenue"
                          ? `+₹${metric.count.toLocaleString("en-IN")}`
                          : `+${metric.count}`}{" "}
                        this period
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Trend Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Platform Growth & Revenue Streams</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Detailed timeline curves indicating user acquisitions, appointment volumes, and revenue streams
              </p>
            </div>

            {/* Toggle tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setTrendTab("traffic")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trendTab === "traffic"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Signups & Bookings
              </button>
              <button
                onClick={() => setTrendTab("revenue")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trendTab === "revenue"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Revenue Stream
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {trendTab === "traffic" ? (
                <AreaChart data={data.trendData || []}>
                  <defs>
                    <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
                  <Area
                    type="monotone"
                    name="Registrations"
                    dataKey="registrations"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRegs)"
                  />
                  <Area
                    type="monotone"
                    name="Appointments Booked"
                    dataKey="appointments"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorAppts)"
                  />
                </AreaChart>
              ) : (
                <AreaChart data={data.trendData || []}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} formatter={(val) => `₹${val}`} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]} />
                  <Area
                    type="monotone"
                    name="Revenue Generated"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Specialty Distribution and Status Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Specialty Demand */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 lg:col-span-2">
          <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Specialty Consultation Demand
          </h4>
          <p className="text-xs text-gray-400 mb-5">
            Breakdown of consultation appointments or signups categorized by medical specializations
          </p>
          <ResponsiveContainer width="100%" height={260}>
            {data.specialtyData && data.specialtyData.length > 0 ? (
              <BarChart data={data.specialtyData} margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
                No specialty data recorded for this time range.
              </div>
            )}
          </ResponsiveContainer>
        </div>

        {/* User Distribution and Verification */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 space-y-6">
          {/* User base share */}
          <div>
            <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              User Base Share
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Distribution of new signups between patients, doctors, and pharmacies
            </p>
            <div className="flex flex-col space-y-2 mt-4">
              {data.registrationsByDept.map((dept, index) => {
                const total = data.registrationsByDept.reduce((acc, curr) => acc + curr.count, 0);
                const percent = total > 0 ? Math.round((dept.count / total) * 100) : 0;
                const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500"];
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-600">{dept.name}</span>
                      <span className="text-gray-800">{dept.count} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[index % colors.length]}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Partner verification */}
          <div>
            <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              Verification Status
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Registration states of Doctors and Pharmacies
            </p>
            <div className="flex items-center justify-center h-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.verificationStatus || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={45}
                    innerRadius={30}
                    paddingAngle={3}
                  >
                    {(data.verificationStatus || []).map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute right-0 flex flex-col space-y-1 justify-center text-xs">
                {(data.verificationStatus || []).map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1.5 font-medium text-gray-600">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Appointment Status Details */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Appointment Slot Statuses
          </h4>
          <p className="text-xs text-gray-400 mb-4">
            Breakdown of consultation booking slots within the selected range
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {["Confirmed", "Pending Payment", "Cancelled", "Locked"].map((statusName, idx) => {
              const statusObj = data.appointmentStatusData.find(s => s.name === statusName) || { value: 0 };
              const colors = ["border-green-500 text-green-700 bg-green-50/30", "border-amber-500 text-amber-700 bg-amber-50/30", "border-red-500 text-red-700 bg-red-50/30", "border-teal-500 text-teal-700 bg-teal-50/30"];
              
              return (
                <div key={idx} className={`p-4 rounded-xl border border-dashed flex flex-col justify-between ${colors[idx % colors.length]}`}>
                  <span className="text-xs font-bold tracking-wide uppercase opacity-85">{statusName}</span>
                  <span className="text-2xl font-extrabold mt-3">{statusObj.value} <span className="text-xs font-normal opacity-70">slots</span></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
