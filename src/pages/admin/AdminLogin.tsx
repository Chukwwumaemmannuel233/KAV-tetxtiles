// src/pages/admin/AdminLogin.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";

export default function AdminLogin() {
  const { loginAdmin } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // loginAdmin internally handles toast notifications and navigation
    loginAdmin(email.trim(), password);
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Admin Login</h2>

        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black"
            placeholder="admin@kavtextiles.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-medium"
        >
          Login
        </button>
      </form>
    </motion.div>
  );
}
