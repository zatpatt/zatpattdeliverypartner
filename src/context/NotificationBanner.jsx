// src/components/NotificationBanner.jsx
import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function NotificationBanner() {
  const { notifications, markAsRead } = useContext(NotificationContext);

  if (!notifications.length) return null;

  const latest = notifications[0];

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow-md z-50 cursor-pointer"
      onClick={() => markAsRead(latest.id)}
    >
      {latest.text}
    </div>
  );
}
