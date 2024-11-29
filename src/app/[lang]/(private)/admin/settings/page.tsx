import { auth } from "@/auth";
import { getUserById } from "@/lib/data/auth";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);

  const user = await getUserById(session.user.id);
  if (!user) redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);

  return (
    <div className="h-full p-4 space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
      <Separator className="my-4" />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>
              Gestiona tu contraseña y la seguridad de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm
              userId={user.id}
              hasPassword={!!user.password}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>Detalles de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Nombre</p>
              <p className="text-sm text-muted-foreground">
                {user.name} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Rol</p>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Último inicio de sesión</p>
              <p className="text-sm text-muted-foreground">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "No disponible"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
