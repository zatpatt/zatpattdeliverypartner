// // src/pages/VerificationStatusPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle } from "lucide-react";

// export default function VerificationStatusPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 text-center">
//       {/* SUCCESS BANNER */}
//       <div className="bg-green-50 border border-green-200 rounded-xl p-4 w-full max-w-md mb-8">
//         <p className="text-green-700 text-sm font-medium">
//           ✔ Your details have been verified successfully
//         </p>
//       </div>

//       {/* TARGET ICON */}
//       <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
//         🎯
//       </div>

//       <h1 className="text-xl font-semibold mb-2">
//         Complete your training to start delivering orders!
//       </h1>

//       <div className="text-sm text-gray-600 space-y-2 mt-4">
//         <p>💰 Optimise your earnings</p>
//         <p>⚡ Pro tips for increased efficiency</p>
//         <p>🎁 Discover rewards and benefits</p>
//       </div>

//       <button
//         onClick={() => navigate("/training-intro")}
//         className="mt-10 w-full max-w-md bg-purple-600 text-white py-3 rounded-xl font-semibold"
//       >
//         Start Training
//       </button>
//     </div>
//   );
// }
