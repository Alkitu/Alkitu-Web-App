import { Metadata } from "next"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Restablecer Contraseña - Inside",
  description: "Restablecer tu contraseña",
}

export default function ResetPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/auth/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        Volver al inicio de sesión
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Restablecer contraseña
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tu correo electrónico para recibir un enlace de restablecimiento
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
} 