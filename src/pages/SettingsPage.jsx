// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dp_dark") === "true"
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem("dp_notifications") !== "false"
  );

  useEffect(() => {
    localStorage.setItem("dp_dark", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("dp_notifications", notifications.toString());
  }, [notifications]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <PageHeader title="Settings" />
      <div className="p-6 max-w-2xl mx-auto w-full space-y-4">
        {/* Dark Mode Toggle */}
        <div className="bg-white rounded-2xl p-4 shadow flex items-center justify-between">
          <div>
            <div className="font-semibold">Dark Mode</div>
            <div className="text-sm text-gray-500">Toggle dark appearance</div>
          </div>
          <button
            onClick={() => setDarkMode((v) => !v)}
            className={`w-12 h-6 rounded-full p-1 ${
              darkMode ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform ${
                darkMode ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="bg-white rounded-2xl p-4 shadow flex items-center justify-between">
          <div>
            <div className="font-semibold">Notifications</div>
            <div className="text-sm text-gray-500">Order updates & alerts</div>
          </div>
          <button
            onClick={() => setNotifications((v) => !v)}
            className={`w-12 h-6 rounded-full p-1 ${
              notifications ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform ${
                notifications ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            alert("Logged out");
            window.location.href = "/";
          }}
          className="w-full bg-white py-3 rounded-xl shadow text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
