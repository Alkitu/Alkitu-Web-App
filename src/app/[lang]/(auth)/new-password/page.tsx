import { NewPasswordForm } from "@/components/auth/new-password-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nueva Contraseña - Inside",
  description: "Establece tu nueva contraseña",
}

export default function NewPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Nueva contraseña
          </h1>
          <p className="text-sm text-muted-foreground">
            Por favor, ingresa tu nueva contraseña
          </p>
        </div>
        <NewPasswordForm />
      </div>
    </div>
  )
} 