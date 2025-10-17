import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth loading animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 2;
        clearInterval(interval);
        setTimeout(onFinish, 600);
        return 100;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {progress < 101 && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Circular Progress */}
          <div className="relative w-28 h-28 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="56"
                cy="56"
                r="50"
                stroke="#3b82f6"
                strokeWidth="6"
                fill="none"
                strokeDasharray="314"
                strokeDashoffset={314 - (progress / 100) * 314}
                strokeLinecap="round"
                transition={{ ease: "easeInOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-blue-400">
              {progress}%
            </span>
          </div>

          {/* Loading Text */}
          <motion.h2
            className="text-xl font-medium tracking-widest uppercase text-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Loading
          </motion.h2>

          {/* Brand Name */}
          <motion.p
            className="mt-2 text-sm text-blue-400 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Kav Textiles
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
