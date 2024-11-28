"use client"

import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const errors = {
  Signin: "Intenta iniciar sesión con una cuenta diferente.",
  OAuthSignin: "Intenta iniciar sesión con una cuenta diferente.",
  OAuthCallback: "Intenta iniciar sesión con una cuenta diferente.",
  OAuthCreateAccount: "Intenta iniciar sesión con una cuenta diferente.",
  EmailCreateAccount: "Intenta iniciar sesión con una cuenta diferente.",
  Callback: "Intenta iniciar sesión con una cuenta diferente.",
  OAuthAccountNotLinked: "Para confirmar tu identidad, inicia sesión con la misma cuenta que usaste originalmente.",
  EmailSignin: "Revisa tu correo electrónico.",
  CredentialsSignin: "Error al iniciar sesión. Verifica que las credenciales sean correctas.",
  AccountBlocked: "Tu cuenta ha sido bloqueada temporalmente por múltiples intentos fallidos.",
  EmailNotVerified: "Por favor, verifica tu correo electrónico antes de iniciar sesión.",
  default: "No se pudo iniciar sesión.",
}

export function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")
  const errorMessage = error && (errors[error as keyof typeof errors] ?? errors.default)

  if (!error) return null

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  )
} 