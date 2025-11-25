// src/pages/RatingsPage.jsx
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function RatingsPage() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("partner_ratings") || "[]");
    setRatings(saved);
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Ratings & Feedback</h2>
      {ratings.length === 0 && <p>No ratings yet.</p>}
      <ul className="space-y-4">
        {ratings.map((r, i) => (
          <li key={i} className="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{r.customer}</p>
              <p className="text-sm text-gray-500">{r.comment}</p>
            </div>
            <div className="flex items-center gap-1">
              <span>{r.rating}</span>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
