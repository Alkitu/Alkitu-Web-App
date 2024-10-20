// src/app/layout.tsx
import { ThemeProvider } from "@/context/ThemeProvider";
import { TranslationsProvider } from "@/context/TranslationContext";
import defaultTranslations from "@/locales/es/common.json"; // Asegúrate de que esta importación sea correcta
import "@/app/styles/globals.css";
import TailwindGrid from "@/components/shared/TailwindGrid";
import { cn, inter } from "@/lib/utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
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
            <TailwindGrid fullSize show>
              <main
                className={cn(
                  "h-full bg-background font-sans antialiased max-w-full min-w-[360px] w-full flex flex-col items- justify-center overflow-x-hidden col-span-full bg-red-50 box-border",
                  inter.className
                )}
              >
                {children}
              </main>
            </TailwindGrid>
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
