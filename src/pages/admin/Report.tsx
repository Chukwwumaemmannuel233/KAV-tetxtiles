"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function FullReportPage() {
  const [range, setRange] = useState("30d");

  const metrics = useMemo(() => ({
    revenue: "₦1,245,600",
    orders: 1134,
    customers: 2480,
    avgOrderValue: "₦1,098",
  }), []);

  const salesSeries = useMemo(() => {
    const base = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      base.push({
        date: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        revenue: Math.floor(20000 + Math.random() * 150000),
        orders: Math.floor(10 + Math.random() * 120),
      });
    }
    return base;
  }, []);

  const productBreakdown = useMemo(() => [
    { name: "Ankara Deluxe", value: 45 },
    { name: "Lace Gold", value: 25 },
    { name: "Velvet Touch", value: 18 },
    { name: "Silk Crepe", value: 12 },
  ], []);

  const COLORS = ["#60A5FA", "#34D399", "#F472B6", "#FBBF24"];

  const downloadCSV = () => {
    const rows = ["date,revenue,orders", ...salesSeries.map(r => `${r.date},${r.revenue},${r.orders}`)];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kav-report-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-blue-950 to-black text-gray-100 overflow-x-hidden p-6 md:p-10"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Business Report</h1>
            <p className="text-gray-400 text-sm mt-1">Keep track of performance and improve your stats.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-900/60 rounded-md p-2 flex items-center gap-2 border border-gray-800">
              <label className="text-xs text-gray-300">Range</label>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="bg-gray-900/60 text-sm text-white outline-none ml-2"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Year to date</option>
              </select>
            </div>

            <button
              onClick={downloadCSV}
              className="bg-white text-black px-2 py-1.5 text-sm rounded-md font-medium shadow hover:opacity-90"
            >
              Export CSV
            </button>
            <button
              onClick={handlePrint}
              className="bg-transparent border border-gray-700 px-2 py-1.5 text-sm rounded-md text-gray-200 hover:bg-gray-900/40"
            >
              Print
            </button>
          </div>
        </div>

        {/* metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 shadow">
              <p className="text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
            </div>
          ))}
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-900/60 border border-gray-800 shadow">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Sales Overview</h4>
              <p className="text-sm text-gray-400">Revenue & Orders</p>
            </div>

            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesSeries}>
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8' }} />
                  <YAxis tickFormatter={(v) => `${(v/1000)|0}k`} tick={{ fill: '#94a3b8' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#60A5FA" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="orders" stroke="#34D399" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 shadow">
            <h4 className="text-lg font-semibold text-white mb-4">Top Categories</h4>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={productBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                  {productBreakdown.map((_entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" wrapperStyle={{ color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 shadow">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Orders</h4>
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-2">Order</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {[1,2,3,4,5].map(i => (
                  <tr key={i} className="border-t border-gray-800/60">
                    <td className="py-3">#KAV-45{i}X</td>
                    <td className="py-3">Customer {i}</td>
                    <td className="py-3">₦{(12000 + i*4500).toLocaleString()}</td>
                    <td className="py-3"><span className="text-green-400">Shipped</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 shadow">
            <h4 className="text-lg font-semibold text-white mb-4">Business Insights</h4>
            <ul className="text-sm text-gray-300 space-y-3">
              <li>• Revenue increased by <span className="text-green-400">12%</span> vs last month.</li>
              <li>• Top selling category: <span className="text-blue-300">Ankara Deluxe</span>.</li>
              <li>• Returning customers make up <span className="text-green-300">38%</span> of buyers.</li>
              <li>• Consider restocking <span className="text-pink-300">Lace Gold</span> (low inventory).</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <button className="bg-white text-black px-2 py-1.5 text-sm rounded-md font-medium">Download PDF</button>
              <Link
                to="/admin/analytics"
                className="bg-transparent border border-gray-700 px-2 py-1.5 text-sm rounded-md text-gray-200 hover:bg-gray-900/40"
              >
                View Full Analytics
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6 mb-6">
          © {new Date().getFullYear()} KAV Textiles • All rights reserved.
        </p>
      </div>
    </motion.main>
  );
}
