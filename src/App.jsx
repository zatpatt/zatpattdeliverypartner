// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import LoginPage from "./pages/LoginPage";
import OtpPage from "./pages/OtpPage";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import EarningsPage from "./pages/EarningsPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />

        {/* Main App */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/earnings" element={<EarningsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}
