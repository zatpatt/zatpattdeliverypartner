// src/pages/NotificationsPage.jsx
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function NotificationsPage() {
  const [notifications] = useState([
    { id: 1, text: "New order assigned #1025", read: false },
    { id: 2, text: "Order #1023 marked delivered", read: true },
    { id: 3, text: "Weekly bonus credited ₹200", read: false },
  ]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <PageHeader title="Notifications" />
      <div className="p-6 max-w-2xl mx-auto w-full space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-white p-3 rounded-xl shadow flex items-center justify-between ${
              n.read ? "opacity-70" : "opacity-100"
            }`}
          >
            <span>{n.text}</span>
            {!n.read && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}
