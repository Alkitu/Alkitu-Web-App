"use client";
import TailwindGrid from "@/components/shared/TailwindGrid";
import { useTranslations } from "@/context/TranslationContext";

export default function ExampleComponent() {
  const t = useTranslations("Home");
  const m = useTranslations("Common");

  return (
    <>
      <TailwindGrid fullSize lgGapY={4}>
        <div className="col-start-4 col-span-2 bg-blue-500">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("variable", { status: m("spanish") })}</p>
          <p>{t("variable", { status: m("english") })}</p>
        </div>
        <div className="col-span-full  bg-green-400">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("variable", { status: m("spanish") })}</p>
          <p>{t("variable", { status: m("english") })}</p>
        </div>
      </TailwindGrid>
      <TailwindGrid bgColor="red" fullSize lgGapY={10}>
        <div className="col-start-3 col-end-11 bg-red-400 text-center">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("variable", { status: m("spanish") })}</p>
          <p>{t("variable", { status: m("english") })}</p>
        </div>
        <div className="col-start-4 col-span-full bg-blue-500">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("variable", { status: m("spanish") })}</p>
          <p>{t("variable", { status: m("english") })}</p>
        </div>
        <div className="col-start-5 col-span-full bg-fuchsia-400">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("variable", { status: m("spanish") })}</p>
          <p>{t("variable", { status: m("english") })}</p>
        </div>
      </TailwindGrid>
    </>
  );
}
