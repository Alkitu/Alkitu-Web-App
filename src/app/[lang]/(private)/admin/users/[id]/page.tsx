// Página de servidor (page.tsx)

import { UserProfile } from "@/components/users/user-profile";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/data/auth";

interface UserPageProps {
  params: Promise<{ id: string; lang: string }>; // `params` es un `Promise`
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UserPage({ params }: UserPageProps) {
  // Resolvemos `params` con `await`
  const { id, lang } = await params; 

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="h-full p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Perfil de Usuario</h2>
        <Link href="/dashboard/users">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <UserProfile user={{
        ...user,
        email: user.email ?? '',
        name: user.name ?? ''
      }} />
    </div>
  );
}
