import { create } from "zustand";
import { getCookie, setCookie } from "cookies-next";

// Define el tipo Locale
type Locale = "en" | "es";

interface LanguageState {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
}

const getInitialLocale = (): Locale => {
  if (typeof window !== "undefined") {
    const savedLocale = getCookie("NEXT_LOCALE") as Locale | undefined;
    if (savedLocale && (savedLocale === "en" || savedLocale === "es")) {
      return savedLocale;
    }
  }
  return "es"; // Default locale
};

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (newLocale: Locale) => {
    setCookie("NEXT_LOCALE", newLocale, { maxAge: 365 * 24 * 60 * 60 });
    set({ locale: newLocale });
  },
}));
