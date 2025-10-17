"use client";

import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserCart() {
  const { cartItems, removeItem, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white pb-10 px-4 sm:px-6 md:px-12 overflow-x-hidden"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 text-center md:text-left">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 mt-16">🛒 Your cart is empty!</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item: any) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-900/60 rounded-xl shadow-lg p-4 sm:p-5"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                {/* Details */}
                <div className="flex-1 px-4 text-center sm:text-left">
                  <h3 className="font-semibold text-blue-300">{item.name}</h3>
                  <p className="text-sm text-gray-400">₦{item.price.toLocaleString()}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start mt-3 gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-gray-200">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-500 mt-3 sm:mt-0 transition"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="bg-gray-900/70 rounded-xl shadow-lg p-6 h-fit sticky md:top-28 top-10">
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-sm md:text-base">
              <span className="text-gray-400">Subtotal:</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm md:text-base">
              <span className="text-gray-400">Shipping:</span>
              <span>₦2,000</span>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-3 border-t border-gray-700 pt-3">
              <span>Total:</span>
              <span>₦{(total + 2000).toLocaleString()}</span>
            </div>
              {/* Checkout Button */} 
              <Link to="/user-checkout"> 
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition shadow-md">
              Proceed to Checkout
            </button>
            </Link> 
          </div>
        </div>
      )}
    </motion.div>
  );
}
