"use client";

import { Outlet, Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Bell,
  User,
  Settings,
  Home,
  ShoppingBag,
} from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

export default function UserLayout() {
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const activePath = location.pathname;

  const tabs = [
    {
      id: "dashboard",
      path: "/dashboard",
      label: "Home",
      icon: <Home size={18} />,
    },
    {
      id: "shop",
      path: "/usershop",
      label: "Shop",
      icon: <ShoppingBag size={18} />,
    },
    {
      id: "cart",
      path: "/user-cart",
      label: "Cart",
      icon: <ShoppingCart size={18} />,
    },
    {
      id: "profile",
      path: "/profile",
      label: "Profile",
      icon: <User size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white flex flex-col relative overflow-y-auto">
      {/* === TOP NAVBAR (both screens) === */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-950 via-blue-950 to-black text-white shadow-md border-b border-gray-800">
        <div className="hidden md:flex items-center justify-between px-8 py-5">
          {/* Left: Logo */}
          <Link
            to="/dashboard"
            className="text-xl font-bold text-blue-400 tracking-wide"
          >
            KAV Textiles
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-6">
            <Link
              to="/cart"
              className="relative hover:text-blue-400 transition"
            >
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
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900/80 backdrop-blur-lg">
          <Link
            to="/dashboard"
            className="text-base font-semibold text-blue-400 tracking-wide"
          >
            KAV Textiles
          </Link>

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

      {/* === SIDEBAR (desktop only) === */}
      <aside className="hidden md:flex flex-col justify-between bg-gray-900/60 p-5 w-60 border-r border-gray-800 fixed h-full top-[75px]">
        <div>
          {/* <h2 className="text-xl font-bold text-blue-400 mb-6">Menu</h2> */}
          <nav className="space-y-3">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition ${
                  activePath === tab.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-gray-500">&copy; 2025 KAV Textiles</p>
      </aside>

      {/* === MAIN PAGE CONTENT === */}
      <main className="flex-1 md:ml-60 p-4 pt-28 md:pt-36 transition-all duration-300">
        <Outlet />
      </main>

      {/* === MOBILE TABS === */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`flex flex-col items-center text-xs transition ${
              activePath === tab.path ? "text-blue-400" : "text-gray-400"
            }`}
          >
            {tab.icon}
            <span className="text-[11px] mt-0.5">{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
