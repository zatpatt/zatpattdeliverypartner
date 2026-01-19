// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { detectCityMock } from "../utils/location";

// export default function SelectCityPage() {
//   const navigate = useNavigate();
//   const [city, setCity] = useState("Detecting...");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const detected = detectCityMock(
//           pos.coords.latitude,
//           pos.coords.longitude
//         );
//         localStorage.setItem("delivery_city", detected);
//         setCity(detected);
//         setLoading(false);
//       },
//       () => {
//         const fallback = "Motihari";
//         localStorage.setItem("delivery_city", fallback);
//         setCity(fallback);
//         setLoading(false);
//       }
//     );
//   }, []);

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-b-3xl">
//         <h1 className="text-lg font-semibold">
//           Choose your city to start earning
//         </h1>
//       </div>

//       {/* MAP MOCK */}
//       <div className="h-48 bg-gray-200 flex items-center justify-center relative">
//         <div className="bg-black text-white px-4 py-1 rounded-full text-sm">
//           {loading ? "Detecting..." : city}
//         </div>
//       </div>

//       {/* INFO */}
//       <div className="p-6 text-center">
//         <h2 className="text-green-600 font-semibold text-lg">
//           Earn upto ₹4,700 per week!
//         </h2>

//         {/* <p className="text-gray-500 text-sm mt-4">Extra Benefits</p>
//         <p className="text-sm mt-2">
//           <span className="font-semibold text-orange-500">₹13,00,000</span>{" "}
//           Insurance cover for you and your family
//         </p> */}
//       </div>

//       <button
//         onClick={() => navigate("/change-city")}
//         className="text-orange-500 font-semibold text-sm"
//       >
//         Change city?
//       </button>

//       <div className="mt-auto p-6">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }
