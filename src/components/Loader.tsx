import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 1200);
    const timer2 = setTimeout(() => onFinish(), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-950 via-gray-900 to-black text-white z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-wide"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Kav <span className="text-blue-400">Textiles</span>
        </motion.h1>

        {showText && (
          <motion.p
            className="mt-3 text-gray-300 text-lg italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Elegance Woven Into Every Thread 🧵
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
