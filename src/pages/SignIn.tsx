"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext"; // ✅ import global toast

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { addNotification } = useNotifications(); // ✅ use your toast system

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      addNotification(
        "Missing Fields",
        "Please fill in all fields.",
        "gray" // toast color
      );
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));

    addNotification(
      "Login Successful 🎉",
      `Welcome back, ${email}!`,
      "green"
    );

    navigate("/dashboard");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <section className="flex justify-center items-center bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white px-6 py-6 md:py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-4 text-center">
          Sign In
        </h1>
        <p className="text-gray-300 text-sm md:text-base text-center mb-8">
          Welcome back! Please enter your login details.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg shadow-lg text-sm md:text-base"
          >
            Sign In
          </motion.button>
        </form>

        {/* Redirect Text */}
        <p className="text-gray-400 text-xs md:text-sm text-center mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:underline"
          >
            Create one
          </button>
        </p>
      </motion.div>
    </section>
  );
}
