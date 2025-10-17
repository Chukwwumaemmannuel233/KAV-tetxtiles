"use client";

import { Link } from "react-router-dom";
import { ShoppingCart, Bell, User, Settings } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

export default function UserNavbar() {
  const { unreadCount } = useNotifications();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-950 via-blue-950 to-black text-white shadow-md">
      {/* === DESKTOP NAVBAR === */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <Link
          to="/dashboard"
          className="text-xl font-bold text-blue-400 tracking-wide"
        >
          KAV Textiles
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative hover:text-blue-400 transition">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 text-[10px] bg-blue-500 text-white rounded-full px-1.5">
              2
            </span>
          </Link>

          <Link to="/notifications" className="relative">
            <Bell className="text-white w-6 h-6 hover:text-blue-400 transition" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-400 transition rounded-full border border-blue-500 p-1.5"
          >
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* === MOBILE NAVBAR === */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        {/* Left: KAV Textiles */}
        <Link
          to="/dashboard"
          className="text-base font-semibold text-blue-400 tracking-wide"
        >
          KAV Textiles
        </Link>

        {/* Right: Notification + Settings */}
        <div className="flex items-center gap-4">
          <Link to="/notifications" className="relative">
            <Bell className="text-white w-6 h-6 hover:text-blue-400 transition" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/settings"
            className="hover:text-blue-400 transition rounded-full border border-blue-500 p-1 p-[6px]"
          >
            <Settings size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
