import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const baseErrorUrl = "/auth/error";

  if (!session) {
    const url = new URL(baseErrorUrl, process.env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set("message", "unauthorized");
    redirect(url.pathname + url.search);
  } else if (session.user.role === undefined) {
    const url = new URL(baseErrorUrl, process.env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set("message", "role-undefined");
    redirect(url.pathname + url.search);
  } else if (session.user.role !== "ADMIN") {
    const url = new URL(baseErrorUrl, process.env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set("message", "forbidden");
    redirect(url.pathname + url.search);
  }

  return <>{children}</>;
}
