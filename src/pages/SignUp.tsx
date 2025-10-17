"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(`Account created successfully for ${firstName} ${lastName}!`);
    // In SignIn or SignUp handleSubmit
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/dashboard");
  };

  return (
    <section className="flex justify-center bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white px-6 py-6 md:py-12 min-h-screen overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-16 md:mt-24"
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-4 text-center">
          Sign Up
        </h1>
        <p className="text-gray-300 text-sm md:text-base text-center mb-8">
          Create your account to start shopping with Kav Textiles.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm text-gray-300 mb-1.5"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm text-gray-300 mb-1.5"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-300 mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1.5"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-300 mb-1.5"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
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
            Sign Up
          </motion.button>
        </form>

        {/* Redirect Text */}
        <p className="text-gray-400 text-xs md:text-sm text-center mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-400 hover:underline"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </section>
  );
}
