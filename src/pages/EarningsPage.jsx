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
  });

  const [pending, setPending] = useState(0);
  const [withdrawStatus, setWithdrawStatus] = useState("none"); 
  // none | pending | completed

  // ------------------------------------------------------
  // LOAD DATA FROM STORAGE
  // ------------------------------------------------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("partner_earnings") || "{}");
    const wallet = JSON.parse(localStorage.getItem("partner_wallet") || "{}");
    const withdraw = localStorage.getItem("withdraw_request") || "none";

    setEarnings({
      daily: saved.daily || 0,
      weekly: saved.weekly || 0,
      monthly: saved.monthly || 0,
      total: saved.total || 0,
      bonuses: saved.bonuses || 0,
    });

    setPending(wallet.pending || 0);
    setWithdrawStatus(withdraw);
  }, []);

  // ------------------------------------------------------
  // HANDLE WITHDRAW REQUEST
  // ------------------------------------------------------
  const handleWithdrawRequest = () => {
    if (pending === 0) return;

    localStorage.setItem("withdraw_request", "pending");
    setWithdrawStatus("pending");
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">

      {/* HEADER */}
      <header className="bg-orange-500 text-white py-4 px-6 shadow-lg flex items-center relative justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 bg-white text-orange-500 p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Earnings</h1>
      </header>

      <div className="p-6 max-w-4xl mx-auto w-full space-y-4">

        {/* DAILY / WEEKLY / MONTHLY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <EarningBox label="Today" value={earnings.daily} />
          <EarningBox label="This Week" value={earnings.weekly} />
          <EarningBox label="This Month" value={earnings.monthly} />
        </div>

        {/* TOTAL & BONUSES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EarningBox label="Total Earnings" value={earnings.total} />
          <EarningBox label="Bonuses & Incentives" value={earnings.bonuses} />
        </div>

        {/* WALLET (PENDING ONLY) */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-3">
          <h2 className="text-lg font-semibold">Wallet</h2>

          <div className="flex justify-between text-sm">
            <span>Pending Balance:</span>
            <span className="font-bold text-gray-700">₹{pending}</span>
          </div>

          {/* WITHDRAW STATUS */}
          {withdrawStatus === "pending" && (
            <p className="text-orange-600 text-sm font-semibold mt-1">
              Withdrawal Requested — Awaiting admin approval
            </p>
          )}

          {/* REQUEST WITHDRAW BUTTON */}
          <button
            disabled={pending === 0 || withdrawStatus === "pending"}
            onClick={handleWithdrawRequest}
            className={`mt-2 w-full py-2 rounded-xl text-white font-semibold 
              ${pending === 0 || withdrawStatus === "pending" 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-orange-500 active:scale-95"
              }`}
          >
            {withdrawStatus === "pending" ? "Request Sent" : "Request Withdrawal"}
          </button>
        </div>

        {/* NOTES */}
        <div className="text-sm text-gray-500">
          * Earnings update automatically after every delivered order.  
          * Pending balance is the amount to be paid by admin.  
          * Withdrawal resets pending balance to ₹0 after admin approves.
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// REUSABLE BOX COMPONENT
// ------------------------------------------------------
function EarningBox({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">₹{value}</div>
    </div>
  );
}
