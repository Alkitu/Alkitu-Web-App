// src/app/layout.tsx
import "@/app/styles/globals.css";
import { cn, inter } from "@/lib/utils";

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
        {children}
      </body>
    </html>
  );
}
