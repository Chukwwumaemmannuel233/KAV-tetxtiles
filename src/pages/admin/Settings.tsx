"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Lock, Bell, Database, Save, User } from "lucide-react";

export default function AdminSettings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-4 sm:p-6 md:p-10 pt-20 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 flex items-center gap-2">
          <Settings size={26} /> Admin Settings
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-xl text-white text-sm sm:text-base font-semibold transition-all"
        >
          <Save size={18} /> Save All Changes
        </motion.button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Profile Settings */}
        <SettingsCard title="Profile & Account" icon={<User size={18} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField label="Full Name" value="UGWU CHUKWUMA EMMANUEL" />
            <InputField label="Email" value="echukwma561@gmail.com" />
            <InputField label="Role" value="Administrator" disabled />
            <InputField label="Password" type="password" value="********" />
          </div>
        </SettingsCard>

        {/* System Preferences */}
        <SettingsCard title="System Preferences" icon={<Bell size={18} />}>
          <ToggleSwitch
            label="Enable Dark Mode"
            enabled={darkMode}
            setEnabled={setDarkMode}
          />
          <ToggleSwitch
            label="Enable Notifications"
            enabled={notifications}
            setEnabled={setNotifications}
          />
        </SettingsCard>

        {/* Security Settings */}
        <SettingsCard title="Security Settings" icon={<Lock size={18} />}>
          <ToggleSwitch
            label="Enable Two-Factor Authentication (2FA)"
            enabled={twoFA}
            setEnabled={setTwoFA}
          />
          <button className="mt-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-200">
            Reset Password
          </button>
        </SettingsCard>

        {/* Backup Settings */}
        <SettingsCard title="Backup & Restore" icon={<Database size={18} />}>
          <p className="text-gray-400 text-sm mb-3">
            Manage your data backups and restore points for the system.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-white text-sm">
              Backup Now
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-200 text-sm">
              Restore Backup
            </button>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}

/* ------------------ REUSABLE COMPONENTS ------------------ */
function SettingsCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      {children}
    </motion.div>
  );
}

function InputField({
  label,
  value,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className={`w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function ToggleSwitch({
  label,
  enabled,
  setEnabled,
}: {
  label: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 py-3">
      <p className="text-gray-300 text-sm sm:text-base">{label}</p>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full p-1 flex items-center transition-all ${
          enabled ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        <motion.div
          layout
          className="w-4 h-4 bg-white rounded-full shadow-md"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            transform: enabled ? "translateX(150%)" : "translateX(0%)",
          }}
        />
      </button>
    </div>
  );
}
