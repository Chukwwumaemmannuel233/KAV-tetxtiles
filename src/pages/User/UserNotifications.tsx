"use client";

import { useNotifications } from "../../context/NotificationContext";
import { motion } from "framer-motion";

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white pt-24 px-6 md:px-12 pb-20"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-400">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => markAsRead(n.id)}
              className={`p-4 rounded-xl border cursor-pointer ${
                n.read
                  ? "bg-gray-900 border-gray-800"
                  : "bg-blue-950/40 border-blue-700"
              } hover:bg-blue-900/50 transition`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-blue-400">{n.title}</h3>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">{n.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
