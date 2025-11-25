// src/pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import DeliveryNavigationPage from "./DeliveryNavigationPage";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [otp, setOtp] = useState("");
  const [delivered, setDelivered] = useState(false);

  // Fetch order from localStorage (simulated)
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("partner_orders") || "[]");
    const found = orders.find((o) => o.id.toString() === id.toString());
    setOrder(found);
  }, [id]);

  if (!order) return <div className="p-6">Order not found.</div>;

  const handleDeliveryConfirmation = () => {
    if (otp === "1234") { // Replace with dynamic OTP logic
      setDelivered(true);
      // Update order status in localStorage
      const orders = JSON.parse(localStorage.getItem("partner_orders") || "[]");
      const updatedOrders = orders.map(o => o.id === order.id ? { ...o, status: "Delivered" } : o);
      localStorage.setItem("partner_orders", JSON.stringify(updatedOrders));
      alert("Order marked as Delivered!");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow">
        <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="ml-4 text-xl font-bold">Order #{order.id}</h1>
      </div>

      <div className="p-6 space-y-4 max-w-4xl mx-auto w-full">
        {/* Customer Info */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <h2 className="font-semibold text-lg">Customer Info</h2>
          <p><strong>Name:</strong> {order.customer}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <div className="flex gap-4 mt-2">
            <a href={`tel:${order.phone}`} className="flex items-center gap-1 text-blue-500">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href={`sms:${order.phone}`} className="flex items-center gap-1 text-green-500">
              <MessageCircle className="w-4 h-4" /> Message
            </a>
          </div>
        </div>

        {/* Pickup & Drop */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <h2 className="font-semibold text-lg">Locations</h2>
          <p><strong>Pickup:</strong> {order.pickup}</p>
          <p><strong>Drop:</strong> {order.drop}</p>
        </div>

        {/* Map & Navigation */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-2">Route</h2>
          <DeliveryNavigationPage pickup={order.pickup} drop={order.drop} />
        </div>

        {/* Items */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg">Items</h2>
          <ul className="list-disc pl-5">
            {order.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ETA */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <p><strong>ETA:</strong> 30 mins</p>
        </div>

        {/* Delivery Confirmation */}
        {!delivered && (
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter OTP at delivery"
              className="p-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleDeliveryConfirmation}
              className="bg-orange-400 text-white py-2 rounded-xl"
            >
              Confirm Delivery
            </button>
          </div>
        )}

        {delivered && (
          <div className="bg-green-100 text-green-800 p-4 rounded-2xl shadow text-center">
            ✅ Delivery Completed
          </div>
        )}
      </div>
    </div>
  );
}
