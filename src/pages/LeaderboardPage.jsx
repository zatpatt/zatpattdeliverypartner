// src/pages/LeaderboardPage.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LeaderboardPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "ratings"
  const [leaders, setLeaders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ---------------- LOAD LEADERBOARD DATA ----------------
  useEffect(() => {
    // Get delivery partners data
    const savedOrders = JSON.parse(localStorage.getItem("partner_orders") || "[]");
    const savedEarnings = JSON.parse(localStorage.getItem("partner_earnings") || "{}");

    // Mock partner name
    const partnerName = localStorage.getItem("partner_name") || "You";

    // Count completed orders
    const completedCount = savedOrders.filter(o => o.status === "Delivered").length;

    // Rating
    const rating = savedEarnings.rating || 0;

    const current = {
      id: 9999,
      name: partnerName,
      completed: completedCount,
      rating: rating,
    };

    setCurrentUser(current);

    // Mock leaderboard (other riders)
    let mock = [];
    for (let i = 1; i <= 150; i++) {
      mock.push({
        id: i,
        name: "Rider " + i,
        completed: Math.floor(Math.random() * 140),
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      });
    }

    // Add current user to list
    mock.push(current);

    setLeaders(mock);
  }, []);

  // ---------------- SORT DATA ----------------
  const sortedByOrders = [...leaders].sort((a, b) => b.completed - a.completed);
  const sortedByRating = [...leaders].sort((a, b) => b.rating - a.rating);

  const top100Orders = sortedByOrders.slice(0, 100);
  const top100Ratings = sortedByRating.slice(0, 100);

  // Find current user rank
  const userOrdersRank =
    sortedByOrders.findIndex((x) => x.id === 9999) + 1;

  const userRatingsRank =
    sortedByRating.findIndex((x) => x.id === 9999) + 1;

  const renderRankMedal = (rank) => {
    if (rank === 1)
      return <Trophy className="text-yellow-400 w-5 h-5" />;
    if (rank === 2)
      return <Trophy className="text-gray-400 w-5 h-5" />;
    if (rank === 3)
      return <Trophy className="text-orange-600 w-5 h-5" />;
    return rank;
  };

  const renderRow = (leader, index, type) => (
    <tr key={leader.id} className={index % 2 === 0 ? "bg-orange-50" : "bg-white"}>
      <td className="p-3 font-semibold text-center">
        {renderRankMedal(index + 1)}
      </td>
      <td className="p-3">{leader.name}</td>

      {type === "orders" ? (
        <td className="p-3 text-center">{leader.completed}</td>
      ) : (
        <td className="p-3 text-center flex items-center gap-1 justify-center">
          {leader.rating} <Star className="text-yellow-400 w-4 h-4" />
        </td>
      )}
    </tr>
  );

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-orange-500 text-white py-4 px-6 shadow-lg relative text-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 bg-white text-orange-500 p-2 rounded-full shadow"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Leaderboard</h1>
      </header>

      {/* TABS */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-l-xl font-semibold ${
            activeTab === "orders"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Completed Orders
        </button>
        <button
          className={`px-4 py-2 rounded-r-xl font-semibold ${
            activeTab === "ratings"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600"
          }`}
          onClick={() => setActiveTab("ratings")}
        >
          Ratings
        </button>
      </div>

      {/* TABLE */}
      <div className="p-6 max-w-4xl mx-auto w-full space-y-4">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="p-3 text-center">Rank</th>
                <th className="p-3">Name</th>

                {activeTab === "orders" ? (
                  <th className="p-3 text-center">Completed Orders</th>
                ) : (
                  <th className="p-3 text-center">Rating</th>
                )}
              </tr>
            </thead>

            <tbody>
              {(activeTab === "orders" ? top100Orders : top100Ratings).map(
                (leader, index) =>
                  renderRow(leader, index, activeTab)
              )}
            </tbody>
          </table>
        </div>

        {/* USER RANK BELOW TOP 100 */}
        {(activeTab === "orders"
          ? userOrdersRank > 100
          : userRatingsRank > 100) && (
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-bold text-lg mb-2">Your Rank</h2>

            <div className="flex justify-between text-sm">
              <span>Rank</span>
              <span className="font-bold">
                {activeTab === "orders" ? userOrdersRank : userRatingsRank}
              </span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span>{currentUser?.name}</span>
              <span className="font-bold">
                {activeTab === "orders"
                  ? currentUser?.completed
                  : currentUser?.rating}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
