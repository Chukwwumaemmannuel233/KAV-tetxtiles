"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsPage() {
  // Monthly performance data
  const performance = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        revenue: 100000 + Math.random() * 120000,
        orders: 80 + Math.random() * 150,
      })),
    []
  );

  // Top products data
  const topProducts = useMemo(
    () => [
      { name: "Ankara Deluxe", sales: 5200 },
      { name: "Lace Gold", sales: 3900 },
      { name: "Velvet Touch", sales: 2800 },
      { name: "Silk Crepe", sales: 2100 },
    ],
    []
  );

  // Customer source (traffic channels)
  const channels = useMemo(
    () => [
      { name: "Social Media", value: 35 },
      { name: "Search Engines", value: 25 },
      { name: "Direct", value: 20 },
      { name: "Referrals", value: 15 },
      { name: "Email Campaigns", value: 5 },
    ],
    []
  );

  // Regional sales
  const regions = useMemo(
    () => [
      { region: "Abuja", value: 4000 },
      { region: "Lagos", value: 3000 },
      { region: "Enugu", value: 1800 },
      { region: "Kano", value: 1500 },
    ],
    []
  );

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F472B6", "#A78BFA"];

  const downloadCSV = () => {
    const rows = ["month,revenue,orders", ...performance.map(r => `${r.month},${r.revenue},${r.orders}`)];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-blue-950 to-black text-gray-100 p-6 md:p-10"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Full Analytics Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Dive deeper into your business performance, audience, and growth insights.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadCSV}
              className="bg-white text-black px-3 py-1.5 text-sm rounded-md font-medium shadow hover:opacity-90"
            >
              Export CSV
            </button>
            <button className="bg-transparent border border-gray-700 px-3 py-1.5 text-sm rounded-md text-gray-200 hover:bg-gray-900/40">
              Download PDF
            </button>
          </div>
        </div>

        {/* Revenue and Orders Trend */}
        <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl shadow mb-8">
          <h4 className="text-lg font-semibold mb-4 text-white">Monthly Revenue & Orders</h4>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={performance}>
              <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fill: "#94a3b8" }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#60A5FA"
                fill="#60A5FA20"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#34D399"
                fill="#34D39920"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products & Traffic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-white mb-4">Top Selling Products</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fill: "#94a3b8" }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#60A5FA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Channels */}
          <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-white mb-4">Traffic Channels</h4>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={channels} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100}>
                  {channels.map((_entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" wrapperStyle={{ color: "#94a3b8" }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Sales */}
        <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl shadow mb-8">
          <h4 className="text-lg font-semibold mb-4 text-white">Regional Sales</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regions}>
              <XAxis dataKey="region" tick={{ fill: "#94a3b8" }} />
              <YAxis tick={{ fill: "#94a3b8" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#FBBF24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Summary */}
        <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl shadow mb-10">
          <h4 className="text-lg font-semibold mb-4 text-white">Performance Insights</h4>
          <ul className="text-sm text-gray-300 space-y-3">
            <li>• Revenue grew by <span className="text-green-400">22%</span> this quarter.</li>
            <li>• <span className="text-blue-300">Ankara Deluxe</span> remains your highest-selling product.</li>
            <li>• Traffic from social media increased by <span className="text-green-400">15%</span>.</li>
            <li>• Lagos region showed <span className="text-yellow-300">strongest purchase growth</span> this month.</li>
            <li>• Returning customers make up <span className="text-purple-300">41%</span> of total buyers.</li>
          </ul>
        </div>

        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} KAV Textiles • Analytics Overview
        </p>
      </div>
    </motion.main>
  );
}
