// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    language: "en",
    notifications: true,
    documents: {
      license: null,
      vehicle: null,
      idProof: null,
      insurance: null,
      bank: null,
    },
  });

  // Load profile from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("partner_profile") || "{}");
    setProfile((prev) => ({ ...prev, ...saved }));
  }, []);

  // Save profile to localStorage
  const saveProfile = () => {
    localStorage.setItem("partner_profile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  const handleDocUpload = (e, key) => {
    const file = e.target.files[0];
    setProfile((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: file ? file.name : null },
    }));
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow">
        <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="ml-4 text-xl font-bold">Profile</h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Personal Info */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-3">
          <h2 className="font-semibold text-lg">Personal Info</h2>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-md"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-2 border rounded-md"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>

        {/* Documents */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-3">
          <h2 className="font-semibold text-lg">Documents</h2>
          <label className="block">
            Driving License:
            <input
              type="file"
              onChange={(e) => handleDocUpload(e, "license")}
              className="mt-1"
            />
            {profile.documents.license && <span className="text-sm text-gray-500">{profile.documents.license}</span>}
          </label>

          <label className="block">
            Vehicle Papers:
            <input
              type="file"
              onChange={(e) => handleDocUpload(e, "vehicle")}
              className="mt-1"
            />
            {profile.documents.vehicle && <span className="text-sm text-gray-500">{profile.documents.vehicle}</span>}
          </label>

          <label className="block">
            ID Proof:
            <input
              type="file"
              onChange={(e) => handleDocUpload(e, "idProof")}
              className="mt-1"
            />
            {profile.documents.idProof && <span className="text-sm text-gray-500">{profile.documents.idProof}</span>}
          </label>

          <label className="block">
            Insurance:
            <input
              type="file"
              onChange={(e) => handleDocUpload(e, "insurance")}
              className="mt-1"
            />
            {profile.documents.insurance && <span className="text-sm text-gray-500">{profile.documents.insurance}</span>}
          </label>

          <label className="block">
            Bank Account Proof:
            <input
              type="file"
              onChange={(e) => handleDocUpload(e, "bank")}
              className="mt-1"
            />
            {profile.documents.bank && <span className="text-sm text-gray-500">{profile.documents.bank}</span>}
          </label>
        </div>

        {/* Settings */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-3">
          <h2 className="font-semibold text-lg">Settings</h2>
          <div className="flex items-center justify-between">
            <span>Language</span>
            <select
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              className="p-2 border rounded-md"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <input
              type="checkbox"
              checked={profile.notifications}
              onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="w-full py-2 bg-orange-400 text-white rounded-xl font-semibold"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
