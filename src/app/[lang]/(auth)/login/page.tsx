import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Página de inicio de sesión",
};

export default function LoginPage() {
  return (
    <div className="container relative hidden min-h-[800px] h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          INSIDE <small className="text-xs ml-1">Campaign Manager</small>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Gestiona tus campañas y recursos de manera eficiente con
              nuestra plataforma.&rdquo;
            </p>
            <footer className="text-sm">Inside Team</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Iniciar sesión
            </h1>
            <p className="text-sm text-muted-foreground">
              Ingresa tus credenciales para continuar
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
