//src\components\PageHeader.jsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, back = true }) {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-orange-500 to-amber-400 text-white py-3 px-4 flex items-center shadow-md">
      {back ? (
        <button
          onClick={() => navigate(-1)}
          className="p-2 mr-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      ) : <div className="w-10" />}
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
