// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CITIES = [
//   { name: "Motihari", status: "live" },
//   { name: "Bettiah", status: "live" },
//   { name: "Gopalganj", status: "live" },
//   { name: "Sitamarhi", status: "coming" },
//   { name: "Muzaffarpur", status: "coming" },
// ];

// export default function ChangeCityPage() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState(
//     localStorage.getItem("delivery_city")
//   );

//   const filtered = CITIES.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const selectCity = () => {
//     localStorage.setItem("delivery_city", selected);
//     navigate(-1);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <div className="p-4 border-b">
//         <input
//           placeholder="Search City"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2"
//         />
//       </div>

//       <div className="px-4">
//         {filtered.map((c) => (
//           <div
//             key={c.name}
//             className={`flex items-center justify-between py-4 border-b ${
//               c.status === "coming" ? "opacity-50" : ""
//             }`}
//             onClick={() => c.status === "live" && setSelected(c.name)}
//           >
//             <span>{c.name}</span>
//             {c.status === "live" ? (
//               <input
//                 type="radio"
//                 checked={selected === c.name}
//                 readOnly
//                 className="accent-orange-500"
//               />
//             ) : (
//               <span className="text-xs text-gray-500">Coming soon</span>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-auto p-6">
//         <button
//           disabled={!selected}
//           onClick={selectCity}
//           className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-300"
//         >
//           Select City
//         </button>
//       </div>
//     </div>
//   );
// }
