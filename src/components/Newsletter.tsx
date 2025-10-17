"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim()) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <section
      className="bg-gradient-to-r from-gray-950 via-blue-950 to-black text-white py-24 px-5 sm:px-8 md:px-12 overflow-hidden"
      style={{ overflowX: "hidden" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 drop-shadow-lg">
          Stay Updated
        </h2>
        <p className="text-gray-300 mb-10 text-base md:text-lg leading-relaxed">
          Subscribe to our newsletter to receive the latest updates on fabrics,
          designs, and exclusive offers from <span className="text-blue-400 font-medium">Kav Textiles</span>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-6 py-3.5 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg shadow-md"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubscribe}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg w-full sm:w-auto text-base md:text-lg transition-all duration-300"
          >
            Subscribe
          </motion.button>
        </div>

        {/* Optional little bottom note */}
        <p className="text-gray-400 text-sm mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
