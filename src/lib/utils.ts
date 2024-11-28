import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter, Merriweather } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inter = Inter({ subsets: ["latin"] });

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["italic", "normal"],
});


export function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}
