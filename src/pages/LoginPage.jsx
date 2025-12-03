// src/pages/LoginPage.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import HeaderImg from "../assets/Header/Header.png"; // same as your main app

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang, t, setLang } = useContext(LanguageContext);
  const [loginInput, setLoginInput] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    if (loginError || passwordError || password.length < 8) return;

    localStorage.setItem(
      "partnerProfile",
      JSON.stringify({ loginInput, password })
    );

    alert(`Logged in successfully as: ${loginInput}`);
    navigate("/dashboard"); // redirect after login
  };

  useEffect(() => {
    const val = loginInput.trim();

    // Check if email or 10-digit phone
    if (val && !/^(\d{10}|[\w.-]+@[\w.-]+\.\w{2,})$/.test(val)) {
      setLoginError("Enter a valid email or 10-digit phone number");
    } else {
      setLoginError("");
    }
  }, [loginInput]);

  useEffect(() => {
    if (password && password.length < 8) {
      setPasswordError("Password must be minimum 8 characters");
    } else {
      setPasswordError("");
    }
  }, [password]);

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
              {t("Delivery Partner Login") }
            </h1>

            <div className="space-y-4">
              {/* Email or Phone Input */}
              <input
                placeholder={t("email or Phone")}
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full border border-orange-400 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}

              {/* Password Input */}
              <input
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-orange-400 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              disabled={!!loginError || !!passwordError || password.length < 8 || !loginInput}
              className={`w-full mt-6 text-white py-3 rounded-xl font-semibold ${
                !loginError && !passwordError && password.length >= 8 && loginInput
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {t("Log In")}
            </motion.button>

            <div className="mt-5 text-sm text-gray-600">
              {t("Don't have an account?") || "Don't have an account?"} 
              <span 
                onClick={() => navigate("/signup")}
                className="text-orange-500 font-semibold cursor-pointer"
              >
                {t(" sign up")}
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-3 mt-auto text-sm">
        © 2025 ZatPatt Delivery Partner
      </footer>
    </div>
  );
}