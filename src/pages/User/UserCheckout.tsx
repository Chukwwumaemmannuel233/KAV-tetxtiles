"use client";

import { useCart } from "../../context/CartContext";
import { useNotifications } from "../../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserCheckout() {
  const { cartItems, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const shipping = 2000;
  const grandTotal = total + shipping;

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method before placing your order.");
      return;
    }

    setShowToast(true); // show loader first

    // Wait for 3 seconds before redirect (simulate processing)
    setTimeout(() => {
      clearCart(); // clear cart AFTER processing (not immediately)
      setShowToast(false);
      navigate("/usershop"); // redirect to shop page

      // 🔔 Sequence starts AFTER redirect:
      setTimeout(() => {
        // 1️⃣ Processing Notification
        addNotification("Order Update", "Your product is being processed...");

        // 2️⃣ After 4 seconds - On the way
        setTimeout(() => {
          addNotification("Order Update", "Your order is on the way 🚚");
        }, 4000);

        // 3️⃣ After 8 seconds - Delivered
        setTimeout(() => {
          const trackingID = "TRK-" + Math.floor(Math.random() * 1000000);
          addNotification(
            "Delivery Update",
            `Your product has been delivered 🎉\nTracking ID: ${trackingID}`
          );
        }, 8000);
      }, 3500); // Start 3.5s after redirect
    }, 3000); // delay before redirect
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen text-white pt-20 md:pt-20 px-6 md:px-12 pb-32 overflow-y-auto"
    >
      {/* ✅ Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <div className="relative w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">
              ✅ Order Placed Successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8 text-center md:text-left">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          🛒 Your cart is empty — add some items first!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT: Shipping Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              Shipping Details
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Address</label>
                <textarea
                  placeholder="House number, street, city"
                  rows={3}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </form>
          </motion.div>

          {/* RIGHT: Order Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:sticky md:top-28"
          >
            <h2 className="text-xl font-semibold text-blue-400">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="max-h-[250px] overflow-y-auto border-b border-gray-800 pb-2">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-3"
                >
                  <div>
                    <p className="text-sm text-gray-200">{item.name}</p>
                    <span className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping:</span>
                <span>₦{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t border-gray-700 pt-3">
                <span>Total:</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* ✅ Stylish Payment Option */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-400 mb-2">Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-md outline-none border border-gray-700 transition duration-200 ease-in-out hover:border-blue-500 focus:ring-2 focus:ring-blue-600 cursor-pointer text-sm sm:text-base"
              >
                <option value="">Select a payment method</option>
                <option value="card">💳 Credit/Debit Card</option>
                <option value="transfer">🏦 Bank Transfer</option>
                <option value="cash">💵 Cash on Delivery</option>
              </select>
            </div>

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium shadow-md hover:shadow-blue-800/40"
            >
              Place Order
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
