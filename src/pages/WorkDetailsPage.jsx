import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, MapPin } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const AVAILABLE_CITIES = {
  Mumbai: {
    zones: [
      {
        name: "Marine Lines",
        radius: "5 km",
        store: "ZatPatt Darkstore – Marine Lines",
      },
      {
        name: "Andheri West",
        radius: "6 km",
        store: "ZatPatt Darkstore – Andheri",
      },
    ],
  },
};

const ALL_CITIES = [
  "Mumbai",
  "Delhi",
  "Pune",
  "Bangalore",
  "Ahmedabad",
];

export default function WorkDetailsPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [locationAllowed, setLocationAllowed] = useState(false);

  const [city, setCity] = useState(null);
  const [zone, setZone] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const [showCityList, setShowCityList] = useState(false);
  const [cityUnavailable, setCityUnavailable] = useState(false);

  /* 🔥 PREVENT RE-ENTRY AFTER COMPLETION */
  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem("onboarding_progress")
    );

    if (progress?.work_details === "completed") {
      navigate("/onboarding-steps", { replace: true });
    }
  }, [navigate]);

  /* ---------------- LOCATION CHECK ---------------- */
  useEffect(() => {
    setTimeout(() => setLocationAllowed(false), 500);
  }, []);

  const detectCity = () => {
    const detectedCity = "Mumbai";
    if (!AVAILABLE_CITIES[detectedCity]) {
      setCityUnavailable(true);
    } else {
      setCity(detectedCity);
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <button onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}>
          <ArrowLeft />
        </button>
        <HelpCircle className="text-orange-500" />
      </div>

      {/* PROGRESS */}
      <div className="px-4 mt-3">
        <div className="h-1 bg-gray-200 rounded">
          <div
            className="h-1 bg-orange-500 rounded transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 pt-6">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-2">
              Select City
            </h2>

            {!cityUnavailable ? (
              <>
                <button
                  onClick={detectCity}
                  className="w-full border border-orange-400 rounded-xl p-4 flex items-center gap-3"
                >
                  <MapPin className="text-orange-500" />
                  <span className="font-medium">
                    Auto detect my city
                  </span>
                </button>

                <button
                  onClick={() => setShowCityList(true)}
                  className="mt-4 text-orange-500 font-medium"
                >
                  Change city
                </button>
              </>
            ) : (
              <div className="text-center mt-10">
                <MapPin size={48} className="mx-auto text-orange-500 mb-4" />
                <p className="font-semibold">
                  Not available in your city
                </p>
                <button
                  onClick={() => {
                    setCityUnavailable(false);
                    setShowCityList(true);
                  }}
                  className="mt-3 text-orange-500 font-medium"
                >
                  Change City
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && city && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Select Zone
            </h2>

            {AVAILABLE_CITIES[city].zones.map((z) => (
              <div
                key={z.name}
                onClick={() => {
                  setZone(z);
                  setStep(3);
                }}
                className="border rounded-xl p-4 mb-3 cursor-pointer"
              >
                <p className="font-medium">{z.name}</p>
                <p className="text-sm text-gray-500">
                  Radius: {z.radius}
                </p>
                <p className="text-xs text-gray-400">
                  {z.store}
                </p>
              </div>
            ))}
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Select vehicle type
            </h2>

            {["Petrol Motorcycle", "Electric Motorcycle", "Bicycle"].map(
              (v) => (
                <div
                  key={v}
                  onClick={() => setVehicle(v)}
                  className={`border rounded-xl p-4 mb-3 cursor-pointer ${
                    vehicle === v
                      ? "border-orange-500 bg-orange-50"
                      : ""
                  }`}
                >
                  {v}
                </div>
              )
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <div className="p-4">
        <button
          disabled={step < 3 || !vehicle}
          onClick={() => {
            // 🔥 SAVE DATA
            localStorage.setItem(
              "work_details",
              JSON.stringify({ city, zone, vehicle })
            );

            // 🔥 UPDATE PROGRESS
            const existing =
              JSON.parse(localStorage.getItem("onboarding_progress")) || {};

            localStorage.setItem(
              "onboarding_progress",
              JSON.stringify({
                ...existing,
                work_details: "completed",
                personal_details: "pending",
                kit_ordered: false,
              })
            );

            navigate("/onboarding-steps");
          }}
          className={`w-full py-3 rounded-xl font-semibold text-white ${
            step === 3 && vehicle
              ? "bg-orange-500"
              : "bg-gray-300"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
