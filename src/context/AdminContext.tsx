// src/context/AdminContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext"; // ✅ import Toast

interface Admin {
  name: string;
  email: string;
  role: string;
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (adminData: Admin) => void;
  loginAdmin: (email: string, password: string) => void;
  logoutAdmin: () => void;
  notify: (message: string, type?: "success" | "error" | "info") => void; // unified notification
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // ✅ get showToast from ToastContext
  const [admin, setAdmin] = useState<Admin | null>(() => {
    try {
      const raw = localStorage.getItem("admin");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (admin) localStorage.setItem("admin", JSON.stringify(admin));
    else localStorage.removeItem("admin");
  }, [admin]);

  const notify = (message: string, type: "success" | "error" | "info" = "info") => {
    // map type to Tailwind background color
    const color =
      type === "success" ? "bg-green-600" : type === "error" ? "bg-red-500" : "bg-blue-500";
    showToast(message, color);
  };

  const login = (adminData: Admin) => {
    setAdmin(adminData);
    notify("Welcome back, Admin!", "success");
    navigate("/admin/dashboard");
  };

  const loginAdmin = (email: string, password: string) => {
    // === Mock auth ===
    if (email === "admin@kavtextiles.com" && password === "admin123") {
      const adminData: Admin = { name: "KAV Admin", email, role: "Super Admin" };
      setAdmin(adminData);
      notify("Login successful! Welcome back!", "success");
      navigate("/admin/dashboard");
      return;
    }
    notify("Invalid admin credentials", "error");
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    notify("Logged out successfully", "info");
    navigate("/admin/login");
  };

  const value: AdminContextType = {
    admin,
    isAuthenticated: !!admin,
    login,
    loginAdmin,
    logoutAdmin,
    notify,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
