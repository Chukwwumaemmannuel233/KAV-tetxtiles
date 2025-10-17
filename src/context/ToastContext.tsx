"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react"; 
import { AnimatePresence, motion } from "framer-motion";


interface ToastContextType {
  showToast: (message: string, color?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; color: string } | null>(
    null
  );

  const showToast = (message: string, color = "bg-green-600") => {
    setToast({ message, color });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* ✅ Toast Component */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white ${toast.color} z-50`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
