"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  color: string; // ✅ Added color for styling
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, color?: string) => void; // ✅ Optional color param
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ Now supports color (default = blue)
  const addNotification = (title: string, message: string, color = "blue") => {
    const newNotification: Notification = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      read: false,
      color, // ✅ Fix: add color property
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // 🕓 Auto-remove after 6 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== newNotification.id)
      );
    }, 4000);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};
