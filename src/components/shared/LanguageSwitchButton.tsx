"use client";
import { useTranslations } from "@/context/TranslationContext";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitchButton: React.FC = () => {
  const pathname = usePathname();
  const [locale, setLocale] = useState("es");

  const t = useTranslations("Common");

  useEffect(() => {
    const pathLocale = pathname.split("/")[1];
    if (pathLocale === "en" || pathLocale === "es") {
      setLocale(pathLocale);
    }
  }, [pathname]);

  const handleLanguageChange = () => {
    const newLocale = locale === "en" ? "es" : "en";
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    window.location.href = `${window.location.origin}${newPath}`;
  };

  return (
    <Button
      onClick={handleLanguageChange}
      variant="default"
      className="dark:bg-slate-900 text-white"
    >
      <Globe className="w-4 mr-2" />
      {t("switchLanguage", {
        language: locale === "en" ? t("spanish") : t("english"),
      })}
    </Button>
  );
};
