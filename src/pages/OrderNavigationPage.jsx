// src/pages/OrderNavigationPage.jsx
import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader";

export default function OrderNavigationPage({ locationState }) {
  const order = locationState?.order;

  useEffect(() => {
    // Open Google Maps for navigation
    if (order?.pickup && order?.drop) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        order.pickup
      )}&destination=${encodeURIComponent(order.drop)}&travelmode=driving`;
      window.open(url, "_blank");
    }
  }, [order]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <PageHeader title="Navigation" />
      <div className="p-6 text-center text-gray-700">
        <p>Navigation opened in Google Maps. Follow the route for delivery.</p>
      </div>
    </div>
  );
}
