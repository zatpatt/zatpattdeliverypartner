import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export default function TrainingCompletedPage() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  /* 🔐 FLOW PROTECTION */
  useEffect(() => {
    const trainingDone = localStorage.getItem("training_completed");

    // ❌ If training not completed, block access
    if (trainingDone !== "true") {
      navigate("/training", { replace: true });
    }
  }, [navigate]);

  /* 🎉 CONFETTI TIMER */
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  /* ✅ GET NAME FROM PERSONAL DETAILS */
  const personalDetails = JSON.parse(
    localStorage.getItem("personal_details") || "{}"
  );

  const firstName = personalDetails.firstName || "Partner";
  const lastName = personalDetails.lastName || "";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      {showConfetti && (
        <Confetti numberOfPieces={200} recycle={false} />
      )}

      {/* 🤝 Illustration */}
      <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-4xl">
        🤝
      </div>

      <h1 className="text-xl font-semibold mb-2">
        Welcome to Zatpatt, {firstName} {lastName}
      </h1>

      <p className="text-sm text-gray-500 mb-10">
        🎉 We’re very happy that you chose us.
      </p>

      <button
        onClick={() => navigate("/seva-shifts", { replace: true })}
        className="w-full max-w-md bg-orange-500 active:bg-orange-600 text-white py-3 rounded-xl font-semibold"
      >
        Continue
      </button>
    </div>
  );
}
