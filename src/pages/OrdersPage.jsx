// src/pages/OrdersPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { LanguageContext } from "../context/LanguageContext";
import { NotificationContext } from "../context/NotificationContext";

export default function OrdersPage() {
  const { t } = useContext(LanguageContext);
  const { addNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("partner_orders") || "[]");
  });

  // Auto-refresh every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(JSON.parse(localStorage.getItem("partner_orders") || "[]"));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id, status) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, status } : o));
      localStorage.setItem("partner_orders", JSON.stringify(updated));
      addNotification(`Order #${id} marked as ${status}`);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <PageHeader title={t("orders")} />
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {orders.length === 0 && <div>No orders yet.</div>}
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
            <div>
              <div className="font-semibold text-lg">Order #{order.id}</div>
              <div className="text-sm text-gray-500">{order.customer}</div>
              <div className="text-sm text-gray-500">{order.status}</div>
            </div>
            <div className="flex gap-2">
              {order.status === "Assigned" && (
                <button
                  onClick={() => updateStatus(order.id, "Picked up")}
                  className="px-3 py-1 bg-orange-400 text-white rounded-xl"
                >
                  Picked Up
                </button>
              )}
              {order.status === "Picked up" && (
                <button
                  onClick={() => updateStatus(order.id, "Delivered")}
                  className="px-3 py-1 bg-green-500 text-white rounded-xl"
                >
                  Delivered
                </button>
              )}
              <button
                onClick={() => navigate(`/order/${order.id}`)}
                className="px-3 py-1 bg-blue-400 text-white rounded-xl"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
