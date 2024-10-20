import TailwindGrid from "@/components/shared/TailwindGrid";
import type { Metadata } from "next";
// import Dashboard from "@/src/components/dashboard/dashboard";
// import AdminHeader from "@/src/components/admin-header/AdminHeader";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TailwindGrid fullSize>
      {/* <Dashboard /> */}
      <div className=" flex-col flex col-span-full items-start">
        {/* <AdminHeader /> */}
        {children}
      </div>
    </TailwindGrid>
  );
}
