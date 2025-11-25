// src/pages/WalletPage.jsx
import React, { useState, useEffect } from "react";

export default function WalletPage() {
  const [wallet, setWallet] = useState({
    available: 0,
    pending: 0,
    history: [],
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("partner_wallet") || "{}");
    if (data) setWallet(data);
  }, []);

  const requestPayout = () => {
    alert("Payout request sent!");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h2 className="text-2xl font-bold mb-4">Wallet & Earnings</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Available Balance</div>
          <div className="text-2xl font-bold">₹{wallet.available}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Pending Balance</div>
          <div className="text-2xl font-bold">₹{wallet.pending}</div>
        </div>
      </div>

      <button
        onClick={requestPayout}
        className="px-6 py-2 bg-orange-400 text-white rounded-xl mb-6"
      >
        Request Payout
      </button>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
        <ul className="space-y-2">
          {wallet.history.length === 0 && <li>No transactions yet</li>}
          {wallet.history.map((tx, index) => (
            <li key={index} className="flex justify-between">
              <span>{tx.type}</span>
              <span>₹{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
