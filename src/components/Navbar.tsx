"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X, Search } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset"
  }, [menuOpen])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-950 via-blue-950 to-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-2xl font-bold text-blue-400 tracking-wide truncate flex-shrink-0"
        >
          Kav Textiles
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-sm md:text-base hover:text-blue-400 font-medium transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Search Bar Desktop */}
        <div className="hidden md:flex items-center bg-gray-800/70 rounded-full px-4 py-2 w-56 lg:w-72 transition-all duration-300">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search fabrics..."
            className="bg-transparent outline-none text-sm md:text-base text-gray-200 placeholder-gray-400 w-full"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          <Link to="/cart" className="relative hover:text-blue-400 transition">
            <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />
            <span className="absolute -top-2 -right-2 text-[10px] bg-blue-500 text-white rounded-full px-1.5">
              2
            </span>
          </Link>

          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-md font-medium transition-all duration-300 whitespace-nowrap"
          >
            Sign In
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-400 md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-8 py-4">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-base hover:text-blue-400 font-medium border-b border-gray-800 pb-3"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
