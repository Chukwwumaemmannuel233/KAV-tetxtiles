"use client";

import { useNotifications } from "../context/NotificationContext";
import { AnimatePresence, motion } from "framer-motion";

export default function GlobalToast() {
  const { notifications } = useNotifications();
  const latest = notifications[0]; // Get the most recent notification

  if (!latest) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={latest.id}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white z-[9999] ${
          latest.color === "green"
            ? "bg-green-600"
            : latest.color === "blue"
            ? "bg-blue-600"
            : "bg-gray-700"
        }`}
      >
        <div className="font-semibold">{latest.title}</div>
        <div className="text-sm">{latest.message}</div>
      </motion.div>
    </AnimatePresence>
  );
}
