// src/app/layout.tsx
import { ThemeProvider } from "@/context/ThemeProvider";
import { TranslationsProvider } from "@/context/TranslationContext";
import defaultTranslations from "@/locales/es/common.json"; // Asegúrate de que esta importación sea correcta
import "@/app/styles/globals.css";
import TailwindGrid from "@/components/shared/TailwindGrid";
import { cn, inter } from "@/lib/utils";
import { LanguageSwitchButton } from "@/components/shared/LanguageSwitchButton";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased max-w-full min-w-[360px] w-full overflow-x-hidden  box-border",
          inter.className
        )}
      >
        <TranslationsProvider
          initialLocale="es"
          initialTranslations={defaultTranslations}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TailwindGrid bgColor="yellow" padding="">
              <header className="flex justify-end gap-4 px-8 bg-slate-900 items-center w-full py-1 col-span-full">
                <LanguageSwitchButton />
                <ThemeToggle />
              </header>
              <main className="flex flex-col items- justify-center col-span-full">
                {children}
              </main>
            </TailwindGrid>
            <Toaster />
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
