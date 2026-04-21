"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang } from '@/lib/translations';

interface LanguageContextProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageKernel({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('EN');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const probeIdentity = async () => {
      const stored = localStorage.getItem('lcode_guardian_lang') as Lang;
      if (stored) {
        setLangState(stored);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;

        let detected: Lang = 'EN';
        if (country === 'IE') {
          detected = 'GA';
        } else if (country === 'SK' || country === 'CZ') {
          detected = 'SK';
        }

        updateLanguage(detected);
      } catch (error) {
        console.error("L-CODE GUARDIAN: Language Kernel regional audit failed:", error);
        updateLanguage('EN');
      } finally {
        setIsLoading(false);
      }
    };

    probeIdentity();
  }, []);

  const updateLanguage = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lcode_guardian_lang', l);
    if (typeof window !== 'undefined') {
      document.documentElement.lang = l.toLowerCase();
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: updateLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageKernel offline.");
  return context;
};

// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN
