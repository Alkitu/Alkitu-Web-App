"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams?.get("message");

  const errorMessages = {
    unauthorized: {
      title: "No autorizado",
      description: "Debes iniciar sesión para acceder a esta página.",
    },
    "role-undefined": {
      title: "Rol no definido",
      description:
        "Tu cuenta no tiene un rol asignado. Contacta al administrador.",
    },
    forbidden: {
      title: "Acceso denegado",
      description: "No tienes permisos para acceder a esta sección.",
    },
    default: {
      title: "Error",
      description: "Ha ocurrido un error inesperado.",
    },
  };

  const error = message
    ? errorMessages[message as keyof typeof errorMessages] ||
      errorMessages.default
    : errorMessages.default;

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">{error.title}</h1>
        <p className="text-lg text-muted-foreground">{error.description}</p>
        <Link href="/login">
          <Button>Volver al inicio de sesión</Button>
        </Link>
      </div>
    </div>
  );
}
