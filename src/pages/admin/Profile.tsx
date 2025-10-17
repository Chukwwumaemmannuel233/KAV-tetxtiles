"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Edit,
  CheckCircle,
  XCircle,
  Activity,
  Shield,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext"; // adjust path if needed

export default function AdminProfile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { notify } = useAdmin(); // ✅ get notify function

  const setupOverview = [
    { id: 1, name: "Admin Access", status: "Completed" },
    { id: 2, name: "Database Connection", status: "Completed" },
    { id: 3, name: "API Integration", status: "In Progress" },
    { id: 4, name: "Backup Configuration", status: "Pending" },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Edited Product Details",
      date: "Oct 14, 2025",
      status: "Success",
    },
    {
      id: 2,
      action: "Updated Order #2345",
      date: "Oct 13, 2025",
      status: "Success",
    },
    {
      id: 3,
      action: "Changed User Role",
      date: "Oct 12, 2025",
      status: "Failed",
    },
    {
      id: 4,
      action: "Accessed Settings Panel",
      date: "Oct 10, 2025",
      status: "Success",
    },
  ];

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-4 sm:px-6 md:p-10 pt-24 pb-10">
      {/* --- Admin Info Header --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4 flex-wrap">
          <motion.img
            src="https://i.pravatar.cc/150?img=68"
            alt="Admin"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-700 object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">
              KAV Admin
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              System Administrator
            </p>
            <p className="text-xs sm:text-sm text-gray-500 break-all">
              echukwma561@gmail.com
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-start sm:justify-end">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 px-3 sm:px-4 py-2 rounded-xl text-white text-sm sm:text-base font-semibold transition-all"
          >
            <Edit size={16} /> Edit
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded-xl text-gray-200 text-sm sm:text-base font-semibold transition-all"
          >
            <Settings size={16} /> Settings
          </button>
        </div>
      </div>

      {/* --- Profile Summary --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg mt-8"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Shield size={20} /> Admin Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info label="Full Name" value="UGWU CHUKWUMA EMMANUEL" />
          <Info label="Email" value="echukwma561@gmail.com" />
          <Info label="Role" value="Admin" />
          <Info label="Department" value="System Management" />
          <Info label="Join Date" value="March 2024" />
          <Info label="Status" value="Active" color="text-green-400" />
        </div>
      </motion.div>

      {/* --- Setup Overview --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg mt-8"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4">
          System Setup Overview
        </h2>

        {/* Table for large screens */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm sm:text-base">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {setupOverview.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
                >
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`flex items-center gap-2 ${
                        item.status === "Completed"
                          ? "text-green-500"
                          : item.status === "In Progress"
                          ? "text-yellow-400"
                          : "text-red-500"
                      }`}
                    >
                      {item.status === "Completed" ? (
                        <CheckCircle size={16} />
                      ) : item.status === "In Progress" ? (
                        <Settings size={16} className="animate-spin" />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile */}
        <div className="grid lg:hidden gap-4">
          {setupOverview.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-800 rounded-xl bg-gray-900 shadow-sm"
            >
              <p className="font-semibold text-blue-400">{item.name}</p>
              <p
                className={`flex items-center gap-2 text-sm mt-1 ${
                  item.status === "Completed"
                    ? "text-green-500"
                    : item.status === "In Progress"
                    ? "text-yellow-400"
                    : "text-red-500"
                }`}
              >
                {item.status === "Completed" ? (
                  <CheckCircle size={14} />
                ) : item.status === "In Progress" ? (
                  <Settings size={14} className="animate-spin" />
                ) : (
                  <XCircle size={14} />
                )}
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- Recent Activity --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg mt-8 mb-10"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Activity size={18} /> Recent Admin Activity
        </h2>

        {/* Table for large screens */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm sm:text-base">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
                >
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.action}</td>
                  <td className="py-3 px-4 text-gray-400">{item.date}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      item.status === "Success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile */}
        <div className="grid lg:hidden gap-4">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-800 rounded-xl bg-gray-900 shadow-sm"
            >
              <p className="font-semibold text-blue-400">{item.action}</p>
              <p className="text-sm text-gray-400 mt-1">{item.date}</p>
              <p
                className={`text-sm font-medium mt-2 ${
                  item.status === "Success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- Edit Modal --- */}
      {showEditModal && (
        <AnimatedModal
          title="Edit Profile"
          onClose={() => setShowEditModal(false)}
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                defaultValue="UGWU CHUKWUMA EMMANUEL"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                defaultValue="echukwma561@gmail.com"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setShowEditModal(false);
                notify("Profile changes saved successfully", "success"); // ✅ show notification
              }}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
            >
              Save Changes
            </button>
          </form>
        </AnimatedModal>
      )}

      {/* --- Settings Modal --- */}
      {showSettingsModal && (
        <AnimatedModal
          title="System Settings"
          onClose={() => setShowSettingsModal(false)}
        >
          <p className="text-gray-400">
            Settings options will be available here soon...
          </p>
        </AnimatedModal>
      )}
    </div>
  );
}

/* ------------------ REUSABLE COMPONENTS ------------------ */
function Info({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`font-medium ${color}`}>{value}</p>
    </div>
  );
}

function AnimatedModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
