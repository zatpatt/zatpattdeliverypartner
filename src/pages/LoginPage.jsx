// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import HeaderImg from "../assets/Header/Header.png"; // same as your main app

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang, t, setLang } = useContext(LanguageContext);
  const [mobile, setMobile] = useState("");
  const [referral, setReferral] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [referralError, setReferralError] = useState("");

  const handleContinue = () => {
    if (mobile.length !== 10 || mobileError || referralError) return; // prevent continue

    localStorage.setItem(
      "partnerProfile",
      JSON.stringify({ mobile, referral })
    );

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem("partnerOtp", otp);
    alert(`OTP for login: ${otp}`);
    navigate("/otp");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff6ed] relative">
      {/* Header */}
      <header className="relative w-full">
        <img
          src={HeaderImg}
          alt="Header"
          className="w-full h-[260px] sm:h-[320px] object-cover animate-zoomOut"
        />
        {/* Language selector */}
        <div className="absolute right-4 top-4 z-20">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm shadow-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-start justify-center px-4 -mt-24 z-30">
        <div className="w-full max-w-md p-[2px] rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 shadow-lg">
          <div className="bg-white rounded-xl p-8 sm:p-10 text-center">
            <h1 className="text-2xl font-bold text-orange-500 mb-6">
              {t("title")}
            </h1>

            <div className="space-y-4">
              {/* Mobile Input */}
              <div className="flex gap-2">
                <select className="border border-gray-300 rounded-xl px-2 py-2 bg-white text-sm">
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input
                  placeholder={t("mobile")}
                  value={mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setMobile(val);

                    // Live validation
                    if (val.length > 0 && !/^\d{10}$/.test(val)) {
                      setMobileError("Enter a valid 10-digit number");
                    } else {
                      setMobileError("");
                    }
                  }}
                  className="flex-1 border border-orange-400 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}

              {/* Referral Input */}
              <input
                placeholder={t("referral")}
                value={referral}
                onChange={(e) => {
                  const val = e.target.value;
                  setReferral(val);

                  // Optional live validation: only letters & numbers allowed
                  if (val && !/^[A-Za-z0-9]*$/.test(val)) {
                    setReferralError("Referral code can contain only letters & numbers");
                  } else {
                    setReferralError("");
                  }
                }}
                className="w-full border border-orange-400 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              {referralError && <p className="text-red-500 text-sm mt-1">{referralError}</p>}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              disabled={mobile.length !== 10 || mobileError || referralError}
              className={`w-full mt-6 text-white py-3 rounded-xl font-semibold ${
                mobile.length === 10 && !mobileError && !referralError
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {t("continue")}
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-3 mt-auto text-sm">
        © 2025 Delivery Partner App. All rights reserved.
      </footer>
    </div>
  );
}
