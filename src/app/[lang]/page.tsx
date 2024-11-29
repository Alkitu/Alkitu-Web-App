import { auth } from "@/auth";
import LoginPage from "./(auth)/login/page";
import { redirect } from "next/navigation";
import HomePage from "./(private)/(clients)/home/page";

export default async function RootPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await auth();

  if (!session?.user) {
    return <LoginPage />;
  }

  return <HomePage />;
}
