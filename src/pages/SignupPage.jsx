// //src\pages\SignupPage.jsx
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { LanguageContext } from "../context/LanguageContext";
// import HeaderImg from "../assets/Header/Header.png";
// import { supabase } from "../lib/supabase";

// export default function SignupPage() {
//   const navigate = useNavigate();
//   const { lang, t, setLang } = useContext(LanguageContext);

//   // states
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [referral, setReferral] = useState("");
//   const [errors, setErrors] = useState({});

//   // signup
// const handleSignup = async () => {
//   let tempErrors = {};

//   if (!firstName.trim()) tempErrors.firstName = "First name required";
//   if (!lastName.trim()) tempErrors.lastName = "Last name required";
//   if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) tempErrors.email = "Enter valid email";
//   if (!/^\d{10}$/.test(mobile)) tempErrors.mobile = "Enter valid 10-digit number";
//   if (password.length < 8) tempErrors.password = "Password min 8 characters";

//   setErrors(tempErrors);
//   if (Object.keys(tempErrors).length) return;

//   try {
//     // 1️⃣ CREATE SUPABASE AUTH USER
//     const { data: signData, error: signErr } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { role: "delivery_partner" }
//       }
//     });

//     if (signErr) {
//       alert(signErr.message);
//       return;
//     }

//     const user = signData?.user;

//     if (!user) {
//       alert("Signup created — please verify your email.");
//       return;
//     }

//     // 2️⃣ CREATE DELIVERY PARTNER PROFILE
//     await supabase.from("delivery_partners").insert([
//       {
//         user_id: user.id,
//         name: `${firstName} ${lastName}`,
//         phone: mobile,
//         referral: referral || null,
//         active: true
//       }
//     ]);

//     // 3️⃣ STORE EMAIL FOR OTP PAGE
//     localStorage.setItem(
//       "delivery_pending_signup",
//       JSON.stringify({ email })
//     );

//     // 4️⃣ REDIRECT TO OTP PAGE
//     alert("A 6-digit verification code has been sent to your email.");
//     navigate("/otp", { state: { email } });

//   } catch (err) {
//     console.error(err);
//     alert(err.message || "Signup failed.");
//   }
// };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#fff6ed] relative">

//       {/* HEADER with background image */}
//       <header className="relative w-full h-[250px]">
//         <img
//           src={HeaderImg}
//           alt="Header"
//           className="w-full h-full object-cover"
//         />
//       </header>

//       {/* FORM CONTAINER (OVERLAPPING HEADER) */}
//       <main className="flex-1 flex items-start justify-center px-4 -mt-24 z-30">
//         <div className="w-full max-w-md p-[2px] rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 shadow-lg">
//           <div className="bg-white rounded-xl p-8 sm:p-10 text-center">
//             <h1 className="text-2xl font-bold text-orange-500 mb-6">Sign Up</h1>

//             {/* Inputs */}
//             <div className="space-y-3 text-left">
//               <input
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="w-full border border-orange-400 rounded-xl px-3 py-2"
//               />
//               {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

//               <input
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="w-full border border-orange-400 rounded-xl px-3 py-2"
//               />
//               {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

//               <input
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-orange-400 rounded-xl px-3 py-2"
//               />
//               {errors.email && <p className="text-red-500">{errors.email}</p>}

//               <input
//                 placeholder="Phone Number"
//                 value={mobile}
//                 onChange={(e) =>
//                   setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
//                 }
//                 className="w-full border border-orange-400 rounded-xl px-3 py-2"
//               />
//               {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}

//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-orange-400 rounded-xl px-3 py-2"
//               />
//               {errors.password && <p className="text-red-500">{errors.password}</p>}

//               <input
//                 placeholder="Referral (optional)"
//                 value={referral}
//                 onChange={(e) => setReferral(e.target.value)}
//                 className="w-full border border-orange-400 rounded-xl px-3 py-2"
//               />
//             </div>

//             {/* Signup button */}
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={handleSignup}
//               className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl"
//             >
//               Sign Up
//             </motion.button>

//             {/* Login link */}
//             <div className="mt-4 text-sm">
//               Already have an account?
//               <span
//                 onClick={() => navigate("/login")}
//                 className="text-orange-500 font-semibold cursor-pointer"
//               >
//                 {" "}
//                 Log In
//               </span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
