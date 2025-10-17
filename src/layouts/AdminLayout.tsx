import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Package, Settings, User } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { to: "/admin/profile", label: "Profile", icon: <User size={20} /> },
    { to: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-gray-950 text-white h-screen overflow-hidden flex">
      {/* Sidebar (Static on Desktop) */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 p-6 space-y-8 shadow-lg z-20">
        <h2 className="text-2xl font-bold tracking-wide text-blue-400">
          KAV Admin
        </h2>
        <nav className="flex flex-col gap-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/20 text-blue-400 font-semibold"
                    : "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 flex flex-col md:ml-64 h-screen">
        {/* Header (Static at top) */}
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 flex items-center justify-between px-6 z-10">
          <h1 className="font-semibold text-lg text-blue-400">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
          </div>
        </header>

        {/* Scrollable Page Section */}
        <main className="flex-1 overflow-y-auto mt-16 ">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-xl border-t border-gray-800 flex justify-around py-3 z-50">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center text-xs transition-all ${
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              {link.icon}
              <span className="mt-1">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
