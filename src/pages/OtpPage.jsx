import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const mobile = location.state?.mobile;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const signupData = JSON.parse(localStorage.getItem("pendingSignupUser") || "{}");

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleVerify = () => {
    const storedOtp = localStorage.getItem("signup_email_otp");

    if (otp === storedOtp) {
      localStorage.setItem("userProfile", JSON.stringify(signupData));
      localStorage.setItem("authToken", "true");

      localStorage.removeItem("pendingSignupUser");
      localStorage.removeItem("signup_email_otp");

      navigate("/dashboard");
    } else {
      setError("Invalid OTP");
    }
  };

  const handleResend = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("signup_email_otp", newOtp);

    alert("New OTP (testing): " + newOtp);

    setTimer(30);
    setCanResend(false);
    setOtp("");
  };

  if (!email) {
    return (
      <div className="text-center mt-20 text-red-500">
        Invalid Access — No email provided
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff6ed] flex justify-center items-center px-6">
      <div className="w-full max-w-sm p-[2px] rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 shadow-lg">

        <motion.div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-700 mb-2">Verification code sent to:</p>
          <p className="text-black font-semibold text-lg mb-4">{email}</p>

          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Enter 6-digit OTP"
            className="w-full border border-orange-400 rounded-xl px-3 py-2 text-center"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleVerify}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl"
          >
            Verify OTP
          </motion.button>

          <div className="mt-3 text-sm text-gray-600">
            {canResend ? (
              <button onClick={handleResend} className="text-orange-500">
                Resend OTP
              </button>
            ) : (
              <span>Resend OTP in {timer}s</span>
            )}
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="mt-3 text-orange-500 underline text-sm"
          >
            Change Email
          </button>
        </motion.div>
      </div>
    </div>
  );
}
