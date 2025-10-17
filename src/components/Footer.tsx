"use client";

import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-950 via-blue-950 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand / Logo */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-blue-400">Kav Textiles</h2>
          <p className="text-gray-300">
            Bringing luxurious and unique fabrics to fashion enthusiasts.
            Premium quality, sustainable, and exclusive designs.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-blue-400">Quick Links</h3>
          <Link to="/" className="hover:text-blue-300 transition">
            Home
          </Link>
          <Link to="/shop" className="hover:text-blue-300 transition">
            Shop
          </Link>
          <Link to="/about" className="hover:text-blue-300 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-300 transition">
            Contact
          </Link>
          <Link
            to="/admin/login"
            className="text-sm text-gray-500 hover:underline"
          >
            Admin Login
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-blue-400">Contact Us</h3>
          <p className="text-gray-300">Email: info@kavtextiles.com</p>
          <p className="text-gray-300">Phone: +234 800 123 4567</p>
          <p className="text-gray-300">Address: Kubwa, Abuja, Nigeria</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-blue-400">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-300 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <Linkedin size={24} />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Kav Textiles. All rights reserved.
      </div>
    </footer>
  );
}
