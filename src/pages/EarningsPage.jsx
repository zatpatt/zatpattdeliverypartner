// src/pages/EarningsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EarningsPage() {
  const navigate = useNavigate();

  const [earnings, setEarnings] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0,
    bonuses: 0,
    pending: 0,
    available: 0,
  });

  // Fetch earnings from localStorage (simulate)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("partner_earnings") || "{}");
    setEarnings({
      daily: saved.daily || 0,
      weekly: saved.weekly || 0,
      monthly: saved.monthly || 0,
      total: saved.total || 0,
      bonuses: saved.bonuses || 0,
      pending: saved.pending || 0,
      available: saved.available || 0,
    });
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow">
        <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="ml-4 text-xl font-bold">Earnings</h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto w-full space-y-4">
        {/* Daily/Weekly/Monthly */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-2xl font-bold">₹{earnings.daily}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <div className="text-sm text-gray-500">This Week</div>
            <div className="text-2xl font-bold">₹{earnings.weekly}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <div className="text-sm text-gray-500">This Month</div>
            <div className="text-2xl font-bold">₹{earnings.monthly}</div>
          </div>
        </div>

        {/* Total & Bonuses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <div className="text-sm text-gray-500">Total Earnings</div>
            <div className="text-2xl font-bold">₹{earnings.total}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <div className="text-sm text-gray-500">Bonuses & Incentives</div>
            <div className="text-2xl font-bold">₹{earnings.bonuses}</div>
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <h2 className="text-lg font-semibold">Wallet</h2>
          <div className="flex justify-between">
            <span>Available Balance:</span>
            <span className="font-bold">₹{earnings.available}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Balance:</span>
            <span className="font-bold text-gray-500">₹{earnings.pending}</span>
          </div>
          <button
            className="mt-2 w-full bg-orange-400 text-white py-2 rounded-xl"
            onClick={() => alert("Withdraw functionality coming soon!")}
          >
            Withdraw
          </button>
        </div>

        {/* Notes */}
        <div className="text-sm text-gray-500">
          * Earnings update in real-time based on completed deliveries. Bonuses are calculated automatically for completing milestones.
        </div>
      </div>
    </div>
  );
}
