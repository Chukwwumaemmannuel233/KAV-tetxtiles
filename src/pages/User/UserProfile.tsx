"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Edit,
  Trash2,
  Check,
  Package,
} from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

export default function UserProfile() {
  const { addNotification } = useNotifications();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Emmanuel Ugwu",
    email: "echukwma561@gmail.com",
    phone: "08161770490",
    address: "Opp Evangel Academy, Kubwa, Abuja",
    profilePic: "https://i.pravatar.cc/150?img=12",
  });

  const [orders] = useState([
    {
      id: 1,
      item: "Cotton Ankara Fabric",
      tracking: generateTrackingNumber(),
      status: "Delivered",
      date: "Oct 3, 2025",
    },
    {
      id: 2,
      item: "Plain Silk Material",
      tracking: generateTrackingNumber(),
      status: "Shipped",
      date: "Oct 9, 2025",
    },
    {
      id: 3,
      item: "Lace Design Set",
      tracking: generateTrackingNumber(),
      status: "Processing",
      date: "Oct 11, 2025",
    },
  ]);

  function generateTrackingNumber() {
    return `KAV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }

  const handleSave = () => {
    setEditing(false);
    addNotification(
      "Profile Updated",
      "Your information has been successfully updated!",
      "green"
    );
  };

  const handleDeleteAccount = () => {
    addNotification(
      "Account Deleted",
      "Your account has been removed from Kav Textiles.",
      "red"
    );
    // Redirect if needed: window.location.href = "/signup";
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Add this function to handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, profilePic: reader.result as string }));
      addNotification(
        "Profile Picture Updated",
        "Your profile picture has been updated!",
        "blue"
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen py-10 px-5 md:px-16">
      <motion.div
        // className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-primary/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md cursor-pointer"
              onClick={handleImageClick}
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div>
              <h2 className="text-2xl font-semibold text-gray-300">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {editing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
            >
              <Check size={18} /> Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
            >
              <Edit size={18} /> Edit
            </button>
          )}
        </div>

        {/* User Details */}
        <div className="mt-10 space-y-4">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Personal Information
          </h3>
          <div className="bg-primary/5 p-5 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={18} />
              {editing ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser((p) => ({ ...p, email: e.target.value }))
                  }
                  className="border-b border-primary/40 outline-none flex-1 bg-transparent focus:border-primary transition"
                />
              ) : (
                <p className="text-gray-500">{user.email}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={18} />
              {editing ? (
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) =>
                    setUser((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="border-b border-primary/40 outline-none flex-1 bg-transparent focus:border-primary transition"
                />
              ) : (
                <p className="text-gray-500">{user.phone}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={18} />
              {editing ? (
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    setUser((p) => ({ ...p, address: e.target.value }))
                  }
                  className="border-b border-primary/40 outline-none flex-1 bg-transparent focus:border-primary transition"
                />
              ) : (
                <p className="text-gray-500">{user.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Order & Audit History
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-primary/10 text-sm text-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-primary/10 text-gray-200 uppercase text-xs">
                <tr>
                  <th className="py-3 px-4 text-left">Item</th>
                  <th className="py-3 px-4 text-left">Tracking</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-gray-200 hover:bg-primary/5 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-2 text-gray-400">
                      <Package className="text-primary" size={16} /> {o.item}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{o.tracking}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        o.status === "Delivered"
                          ? "text-green-600"
                          : o.status === "Shipped"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {o.status}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Account */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            Account Actions
          </h3>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
          >
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
