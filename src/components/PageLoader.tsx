"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
      <div className="relative flex items-center justify-center">
        {/* Rotating circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>

        {/* Static text */}
        <span className="absolute text-white text-2xl font-bold">Kav</span>
      </div>

      <p className="text-white text-sm mt-4 animate-pulse">Loading...</p>
    </div>
  );
}
