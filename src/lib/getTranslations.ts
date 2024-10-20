// lib/getTranslations.ts
import fs from "fs/promises";
import path from "path";

export async function getTranslations(lang: string = "es") {
  const filePath = getTranslationFilePath(lang);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default function getTranslationFilePath(locale: string): string {
  return path.join(process.cwd(), "src", "locales", locale, "common.json");
}
