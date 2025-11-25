// src/context/LanguageContext.jsx
import React, { createContext, useState } from "react";
import translations from "./translations";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("dp_lang") || "en");

  const t = (key) => {
    return translations[lang][key] || key;
  };

  // persist language
  React.useEffect(() => {
    localStorage.setItem("dp_lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
