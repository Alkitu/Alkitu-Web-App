import { validateVerificationToken } from "@/lib/services/token-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Mail, CheckCircle2 } from "lucide-react"

interface VerifyPageProps {
  searchParams: {
    token?: string
    email?: string
    success?: string
  }
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { token, email, success } = searchParams

  // Si hay éxito, mostrar mensaje de verificación exitosa
  if (success === "true") {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Verificación exitosa
            </CardTitle>
            <CardDescription>
              Tu cuenta ha sido verificada correctamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/auth/login">
              <Button className="w-full">
                Iniciar sesión
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Si no hay token, mostrar página de espera
  if (!token) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Verifica tu email
            </CardTitle>
            <CardDescription>
              Te hemos enviado un enlace de verificación a {email || "tu correo electrónico"}.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground">
              <p>Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.</p>
              <p className="mt-2">Si no recibes el email en unos minutos, revisa tu carpeta de spam.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Si hay token, validar
  const result = await validateVerificationToken(token)

  if ("error" in result) {
    return (
      <VerifyError 
        title={
          result.error === "Token expirado" 
            ? "Token expirado"
            : "Token inválido"
        }
        message={
          result.error === "Token expirado"
            ? "El enlace de verificación ha expirado. Por favor, solicita uno nuevo."
            : "El enlace de verificación no es válido. Por favor, verifica que estés usando el enlace correcto."
        }
      />
    )
  }

  redirect(`/auth/verify?success=true`)
}

interface VerifyErrorProps {
  title: string
  message: string
}

function VerifyError({ title, message }: VerifyErrorProps) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link href="/auth/login">
            <Button className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" className="w-full">
              Crear nueva cuenta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
} 