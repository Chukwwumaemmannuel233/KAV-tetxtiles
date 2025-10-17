"use client";

import { motion } from "framer-motion";
import { Users, ShoppingBag, Package, DollarSign } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function AdminDashboard() {
  const stats = [
    { id: 1, title: "Total Users", value: "2,480", icon: <Users size={22} />, color: "text-blue-400" },
    { id: 2, title: "Total Orders", value: "1,134", icon: <ShoppingBag size={22} />, color: "text-emerald-400" },
    { id: 3, title: "Total Products", value: "87", icon: <Package size={22} />, color: "text-pink-400" },
    { id: 4, title: "Revenue", value: "₦1.2M", icon: <DollarSign size={22} />, color: "text-yellow-400" },
  ];

  const activities = [
    { icon: "🧵", text: "New fabric ‘Royal Silk’ added." },
    { icon: "📦", text: "Order #KAV-453X marked as shipped." },
    { icon: "👤", text: "User ‘Sarah Johnson’ registered." },
    { icon: "💰", text: "₦250,000 revenue received from Stripe." },
    { icon: "🎨", text: "New color variant ‘Ocean Blue’ added." },
  ];

  const topSelling = [
    { name: "Ankara Deluxe", sold: "120", img: "https://media.istockphoto.com/id/2214934348/photo/small-business-owner-of-an-african-print-ankara-fabric-shop-proudly-displaying-different.jpg?s=612x612&w=0&k=20&c=E8tj1cpCaKGZ8SwsYWSnAAjEulR9CVwq544ctJj7PAw=" },
    { name: "Lace Gold", sold: "98", img: "https://media.istockphoto.com/id/1301349878/photo/color-straight-strip-of-lace-fabric-on-a-gray-background-elastic-silk-nylon-braid-border-use.jpg?s=612x612&w=0&k=20&c=hqmc-R3UEmHnHVvzk5xXXh9jgqkn2d1-sNvEWjMxeYA=" },
    { name: "Velvet Touch", sold: "76", img: "https://media.istockphoto.com/id/175418486/photo/red-fabric-texture-of-wave-pattern-with-copy-space.jpg?s=612x612&w=0&k=20&c=rueejOPfp-xzGBviWqOXCEd1Ps8LDJ3c5qlUmYOmI6Q=" },
  ];

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-blue-950 to-black text-gray-100 px-6 sm:px-8 md:px-10 lg:px-16 py-10 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Unified main content area */}
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            Welcome back, Admin 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Here’s how your store is performing today.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-gray-800 shadow-md flex items-center justify-between"
            >
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-1 text-white">
                  {stat.value}
                </h2>
              </div>
              <div className={`p-3 rounded-xl bg-gray-800 ${stat.color}`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Recent Activities */}
        <section className="bg-gray-900/70 rounded-xl p-6 border border-gray-800 mb-10">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-4 text-gray-300 text-sm">
            {activities.map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 hover:bg-blue-900/20 transition"
              >
                <span className="text-blue-400 text-lg">{item.icon}</span>
                {item.text}
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Top Selling Products */}
        <section className="bg-gray-900/70 rounded-xl p-6 border border-gray-800 mb-10">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            Top Selling Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSelling.map((product, idx) => (
              <div
                key={idx}
                className="bg-gray-800/60 p-4 rounded-lg flex items-center gap-4 hover:scale-105 transition"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Sold: {product.sold}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Overview */}
        <section className="bg-gray-900/70 rounded-xl p-6 border border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Business Overview
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Keep track of your performance and improve your store's insights.
              </p>
            </div>
            <Link to="/admin/report"> 
            <button className="bg-white text-pink-600 font-medium px-5 py-2 rounded-xl shadow hover:bg-pink-50 transition">
              View Full Report
            </button>
            </ Link>
          </div>

          <div className="h-56 bg-gradient-to-r from-blue-800/40 to-blue-600/30 rounded-lg border border-blue-800/40 flex items-center justify-center">
            <p className="text-gray-400 italic">
              📊 Business analytics and insights (coming soon)
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-10">
          © {new Date().getFullYear()} KAV Textiles Admin Dashboard • All rights reserved.
        </footer>
      </div>
    </motion.div>
  );
}
