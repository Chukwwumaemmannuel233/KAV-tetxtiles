"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Edit,
  Check,
  Moon,
  Sun,
  Bell,
  Lock,
  Trash2,
  User,
  Globe
} from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

export default function SettingsPage() {
  const { addNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [user, setUser] = useState({
    name: "Emmanuel Ugwu",
    email: "echukwma561@gmail.com",
    phone: "08161770490",
    profilePic: "https://i.pravatar.cc/150?img=12",
    language: "English",
  });

  const handleSaveProfile = () => {
    setEditingProfile(false);
    addNotification("Profile Updated", "Your profile information has been updated!", "green");
  };

  const handleDeleteAccount = () => {
    addNotification("Account Deleted", "Your account has been removed from Kav Textiles.", "red");
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "preferences", label: "Preferences", icon: <Sun size={16} /> },
    { id: "security", label: "Security", icon: <Lock size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "account", label: "Account Actions", icon: <Trash2 size={16} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen text-white py-5 px-5 md:px-16"
    >
      <h1 className="text-3xl font-bold text-primary mb-8">Settings</h1>

      {/* Tabs */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white font-semibold shadow-md"
                : "bg-primary/10 text-gray-400 hover:bg-primary/20"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-primary/5 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-primary">Profile Information</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-28 h-28">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md cursor-pointer"
                  onClick={() => document.getElementById("profilePicInput")?.click()}
                />
                <input
                  id="profilePicInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  {editingProfile ? (
                    <>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-gray-900 text-white px-4 py-2 rounded-md outline-none border border-primary/50 focus:border-primary transition flex-1"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-900 text-white px-4 py-2 rounded-md outline-none border border-primary/50 focus:border-primary transition flex-1"
                        placeholder="Email"
                      />
                      <button
                        onClick={handleSaveProfile}
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Check size={16} /> Save
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-gray-400 text-lg">{user.name}</p>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="bg-primary hover:bg-primary/80 px-6 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Edit size={16} /> Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="bg-primary/5 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-primary">Preferences</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />} Dark Mode
              </div>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="toggle-checkbox"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Bell size={18} /> Notifications
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="toggle-checkbox"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Globe size={18} /> Language
              </div>
              <select
                value={user.language}
                onChange={(e) => setUser((prev) => ({ ...prev, language: e.target.value }))}
                className="bg-gray-900 text-white px-4 py-2 rounded-md outline-none border border-primary/50 focus:border-primary transition"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="bg-primary/5 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-primary">Security</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span>Change Password</span>
              <button className="bg-primary hover:bg-primary/80 px-6 py-2 rounded-lg">Update</button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span>Two-Factor Authentication</span>
              <input type="checkbox" className="toggle-checkbox" />
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-primary/5 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-primary">Notification Settings</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span>Email Notifications</span>
                <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} className="toggle-checkbox" />
              </div>
              <div className="flex justify-between items-center">
                <span>Push Notifications</span>
                <input type="checkbox" className="toggle-checkbox" />
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="bg-primary/5 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-red-500">Account Actions</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-red-500 font-medium">Delete Account</span>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-yellow-500 font-medium">Deactivate Account</span>
              <button className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg flex items-center gap-2">
                Deactivate
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
