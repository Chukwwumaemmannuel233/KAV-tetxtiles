"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash2, Download } from "lucide-react";

export default function Orders() {
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "#1021",
      customer: "Jane Doe",
      date: "Oct 10, 2025",
      total: "₦45,000",
      status: "Delivered",
    },
    {
      id: "#1022",
      customer: "John Smith",
      date: "Oct 12, 2025",
      total: "₦32,500",
      status: "Pending",
    },
    {
      id: "#1023",
      customer: "Sarah Johnson",
      date: "Oct 13, 2025",
      total: "₦28,900",
      status: "Shipped",
    },
    {
      id: "#1024",
      customer: "Michael Brown",
      date: "Oct 14, 2025",
      total: "₦18,700",
      status: "Cancelled",
    },
  ];

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-500 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-black text-white px-4 sm:px-6 md:px-10 py-6 md:py-10 overflow-y-auto pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
            Orders
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Manage and track all customer orders in one place
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-none w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-900 text-gray-200 pl-9 pr-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none w-full"
            />
          </div>

          {/* Buttons */}
          <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-all w-full sm:w-auto">
            <Filter size={18} />
            Filter
          </button>

          <button className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all w-full sm:w-auto">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* TABLE VIEW (Desktop only) */}
      <div className="hidden md:block bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">
                Order ID
              </th>
              <th className="py-3 px-4 text-left whitespace-nowrap">
                Customer
              </th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Date</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Total</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors"
              >
                <td className="py-3 px-4 font-semibold">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4 font-medium text-blue-400">
                  {order.total}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button
                    className="p-2 rounded-full hover:bg-gray-700 transition"
                    aria-label="View Order"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-blue-700 transition"
                    aria-label="Edit Order"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-red-700 transition"
                    aria-label="Delete Order"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No orders found.
          </div>
        )}
      </div>

      {/* CARD VIEW (Mobile only) */}
      <div className="grid md:hidden mt-6 gap-4">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-md space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-blue-400">{order.id}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              <span className="font-medium">Customer:</span> {order.customer}
            </p>
            <p className="text-sm text-gray-400">{order.date}</p>
            <p className="text-sm text-blue-400 font-semibold">{order.total}</p>
            <div className="flex justify-end gap-3 mt-2">
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Eye size={16} />
              </button>
              <button className="p-2 hover:bg-blue-700 rounded-full">
                <Edit size={16} />
              </button>
              <button className="p-2 hover:bg-red-700 rounded-full">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
