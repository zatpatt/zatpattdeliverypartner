// src/pages/LeaderboardPage.jsx
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Star } from "lucide-react";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const savedLeaders = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    if (savedLeaders.length) {
      setLeaders(savedLeaders);
    } else {
      const mockLeaders = [
        { id: 1, name: "Alice", completed: 45, earnings: 12000, rating: 4.9 },
        { id: 2, name: "Bob", completed: 38, earnings: 9800, rating: 4.7 },
        { id: 3, name: "Charlie", completed: 33, earnings: 8700, rating: 4.6 },
        { id: 4, name: "David", completed: 29, earnings: 7800, rating: 4.5 },
        { id: 5, name: "Eva", completed: 25, earnings: 6500, rating: 4.4 },
      ];
      setLeaders(mockLeaders);
      localStorage.setItem("leaderboard", JSON.stringify(mockLeaders));
    }
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <PageHeader title="Leaderboard" />
      <div className="p-6 max-w-4xl mx-auto w-full space-y-4">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Name</th>
                <th className="p-3">Completed Orders</th>
                <th className="p-3">Earnings (₹)</th>
                <th className="p-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader, index) => (
                <tr key={leader.id} className={index % 2 === 0 ? "bg-orange-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{index + 1}</td>
                  <td className="p-3">{leader.name}</td>
                  <td className="p-3">{leader.completed}</td>
                  <td className="p-3">{leader.earnings}</td>
                  <td className="p-3 flex items-center gap-1">
                    {leader.rating} <Star className="w-4 h-4 text-yellow-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
