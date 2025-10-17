"use client";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-10">
        <Outlet />
      </main>
    </div>
  );
}
