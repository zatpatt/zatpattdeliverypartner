// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useContext } from "react";
import PageHeader from "../components/PageHeader";
import { Star, Phone, MessageCircle, Navigation2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { NotificationContext } from "../context/NotificationContext";
import Confetti from "react-confetti";

// Optimize multi-order route
function optimizeRoute(orders, startLat, startLng) {
  const remaining = [...orders];
  const route = [];
  let current = { lat: startLat, lng: startLng };

  while (remaining.length) {
    let nearestIndex = 0;
    let nearestDistance = Number.MAX_VALUE;
    remaining.forEach((o, idx) => {
      const dLat = current.lat - o.pickupLat;
      const dLng = current.lng - o.pickupLng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = idx;
      }
    });
    const nextOrder = remaining.splice(nearestIndex, 1)[0];
    route.push(nextOrder);
    current = { lat: nextOrder.dropLat, lng: nextOrder.dropLng };
  }
  return route;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  const { addNotification } = useContext(NotificationContext);

  const [online, setOnline] = useState(() => {
    const savedStatus = localStorage.getItem("partnerOnlineStatus");
    return savedStatus !== null ? savedStatus === "true" : true;
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("partner_orders") || "[]")
  );
  const [earnings, setEarnings] = useState(() =>
    JSON.parse(localStorage.getItem("partner_earnings") || "{}")
  );
  const [wallet, setWallet] = useState(() =>
    JSON.parse(localStorage.getItem("partner_wallet") || "{}")
  );

  const toggleOnline = () => {
    setOnline((prev) => {
      const newStatus = !prev;
      localStorage.setItem("partnerOnlineStatus", newStatus);
      if (newStatus) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        addNotification("You're online and ready for new orders!");
      }
      return newStatus;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!online) return;
      const newOrder = {
        id: Date.now(),
        customer: `Customer ${Math.floor(Math.random() * 100)}`,
        phone: "9876543210",
        pickup: "123 Main St, City",
        drop: "456 Market St, City",
        pickupLat: 28.6139 + Math.random() * 0.01,
        pickupLng: 77.2090 + Math.random() * 0.01,
        dropLat: 28.6270 + Math.random() * 0.01,
        dropLng: 77.2190 + Math.random() * 0.01,
        items: ["Item A", "Item B"],
        status: "Assigned",
        eta: "25 mins",
        timestamp: new Date().toLocaleTimeString(),
      };

      setOrders((prev) => {
        const updated = [newOrder, ...prev];
        localStorage.setItem("partner_orders", JSON.stringify(updated));
        return updated;
      });

      addNotification(`New order assigned: #${newOrder.id}`);
    }, 15000);
    return () => clearInterval(interval);
  }, [online, addNotification]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      );
      localStorage.setItem("partner_orders", JSON.stringify(updated));
      addNotification(`Order #${id} status updated to ${newStatus}`);
      return updated;
    });
  };

  const routeMapUrl = (routeOrders) => {
    if (!routeOrders.length) return "";
    const origin = `${routeOrders[0].pickupLat},${routeOrders[0].pickupLng}`;
    const destination = `${routeOrders[routeOrders.length - 1].dropLat},${routeOrders[routeOrders.length - 1].dropLng}`;
    const waypoints = routeOrders
      .slice(1, -1)
      .map((o) => `${o.pickupLat},${o.pickupLng}|${o.dropLat},${o.dropLng}`)
      .join("|");

    return `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ""
    }&mode=driving`;
  };

  const openNavigation = (routeOrders) => {
    if (!routeOrders.length) return;
    const origin = `${routeOrders[0].pickupLat},${routeOrders[0].pickupLng}`;
    const destination = `${routeOrders[routeOrders.length - 1].dropLat},${routeOrders[routeOrders.length - 1].dropLng}`;
    const waypoints = routeOrders
      .slice(1, -1)
      .map((o) => `${o.pickupLat},${o.pickupLng}|${o.dropLat},${o.dropLng}`)
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ""
    }&travelmode=driving`;
    window.open(url, "_blank");
  };

  const optimizedOrders = optimizeRoute(
    orders.filter((o) => o.status !== "Delivered"),
    28.6139,
    77.2090
  );

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col relative">
      {showConfetti && <Confetti />}
      <PageHeader title={t("dashboard")} />

      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* Online Status */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">
          <span className="font-semibold">Status:</span>
          <div className="flex items-center gap-2">
            <div
              onClick={toggleOnline}
              className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                online ? "bg-orange-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  online ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </div>
            <span
              className={`font-semibold ${online ? "text-orange-500" : "text-gray-500"}`}
            >
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Earnings & Wallet */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-sm text-gray-500">Today's Earnings</div>
            <div className="text-2xl font-bold">₹{earnings.daily || 0}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-sm text-gray-500">Total Earnings</div>
            <div className="text-2xl font-bold">₹{earnings.total || 0}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-sm text-gray-500">Wallet Balance</div>
            <div className="text-2xl font-bold">₹{wallet.available || 0}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-sm text-gray-500">Rating</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {earnings.rating || 0} <Star className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-4 shadow flex justify-around flex-wrap gap-2">
          <button onClick={() => navigate("/orders")} className="px-4 py-2 bg-orange-400 text-white rounded-xl">View Orders</button>
          <button onClick={() => navigate("/earnings")} className="px-4 py-2 bg-orange-400 text-white rounded-xl">Earnings</button>
          <button onClick={() => navigate("/leaderboard")} className="px-4 py-2 bg-orange-400 text-white rounded-xl">Leaderboard</button>
          <button onClick={() => navigate("/profile")} className="px-4 py-2 bg-orange-400 text-white rounded-xl">Profile</button>
        </div>

        {/* Optimized Orders Section */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <h3 className="text-lg font-semibold">Optimized Route Orders</h3>
          {optimizedOrders.length === 0 && <p className="text-gray-400">No active orders</p>}
          {optimizedOrders.map((order) => (
            <div key={order.id} className="border rounded-xl p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="text-sm text-gray-500">{order.timestamp}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Customer: {order.customer} | Phone: {order.phone}
                </div>
                <div className="text-sm text-gray-600">
                  Pickup: {order.pickup} | Drop: {order.drop}
                </div>
                <div className="text-sm text-gray-600">
                  Items: {order.items.join(", ")} | ETA: {order.eta}
                </div>
                <div className="text-sm mt-1">
                  Status: <span className="font-semibold">{order.status}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2 md:mt-0">
                <button className="flex items-center gap-1 px-3 py-1 bg-green-400 text-white rounded-xl text-sm" onClick={() => updateOrderStatus(order.id, "Picked up")}>Picked up</button>
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-400 text-white rounded-xl text-sm" onClick={() => updateOrderStatus(order.id, "On the way")}>On the way</button>
                <button className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-xl text-sm" onClick={() => updateOrderStatus(order.id, "Delivered")}>Delivered</button>
                <button className="flex items-center gap-1 px-3 py-1 bg-orange-400 text-white rounded-xl text-sm" onClick={() => openNavigation(optimizedOrders)}>
                  <Navigation2 className="w-4 h-4" /> Navigate
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-orange-400 text-white rounded-xl text-sm">
                  <Phone className="w-4 h-4" /> Call
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-purple-400 text-white rounded-xl text-sm">
                  <MessageCircle className="w-4 h-4" /> Chat
                </button>
              </div>
            </div>
          ))}

          {optimizedOrders.length > 0 && (
            <div className="w-full h-64 rounded-xl overflow-hidden mt-2">
              <iframe
                src={routeMapUrl(optimizedOrders)}
                width="100%"
                height="100%"
                className="border-0"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
