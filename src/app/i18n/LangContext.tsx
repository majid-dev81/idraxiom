// src/app/i18n/LangContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { content, Lang, Dictionary } from "./content";

type LangContextValue = {
  lang: Lang;
  toggleLang: () => void;
  t: Dictionary;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "idraxiom-lang";

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  // Pick up a saved preference after mount (avoids SSR/CSR mismatch).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "ar") {
        setLang(saved);
      }
    } catch {
      // localStorage unavailable — fall back to default "en"
    }
  }, []);

  // Keep <html lang>/dir in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: content[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
};
