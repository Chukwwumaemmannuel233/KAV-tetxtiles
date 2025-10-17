"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string; // ✅ Keep ID as string for consistency
  name: string;
  price: number | string;
  image: string;
  quantity: number;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 🛒 Load and merge duplicate products from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("guestCart");
    if (saved) {
      const parsed: CartItem[] = JSON.parse(saved);
      const merged = parsed.reduce((acc: CartItem[], item: CartItem) => {
        const existing = acc.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          acc.push({ ...item, quantity: item.quantity || 1 });
        }
        return acc;
      }, []);
      setCartItems(merged);
      localStorage.setItem("guestCart", JSON.stringify(merged));
    }
  }, []);

  // ➕ / ➖ Quantity control
  const handleQuantityChange = (id: string, change: number) => {
    const updated = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
  };

  // 🗑 Remove item
  const handleRemove = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
  };

  // 💰 Total price calculation
  const total = cartItems.reduce((sum, item) => {
    const numericPrice =
      typeof item.price === "string"
        ? Number(item.price.replace(/[₦,]/g, ""))
        : item.price;
    return sum + numericPrice * item.quantity;
  }, 0);

  // 🧾 Checkout (guest redirect)
  const handleCheckout = () => {
    navigate("/signin");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-300 text-lg mb-6">
              Your cart is empty. Start shopping now!
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
            >
              Go to Shop
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* 🛍 Cart Items */}
            <div className="bg-gray-900/60 rounded-2xl p-6 shadow-lg divide-y divide-gray-800">
              {cartItems.map((item, idx) => {
                const numericPrice =
                  typeof item.price === "string"
                    ? Number(item.price.replace(/[₦,]/g, ""))
                    : item.price;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row items-center gap-6 py-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-blue-400 font-medium mt-1">
                        ₦{numericPrice.toLocaleString()}
                      </p>
                      <div className="flex justify-center sm:justify-start items-center gap-4 mt-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="ml-4 text-red-500 hover:text-red-600 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 💵 Total + Checkout */}
            <div className="bg-gray-900/60 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-400">Total</h2>
                <p className="text-white text-lg">₦{total.toLocaleString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition"
                >
                  Sign In to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
