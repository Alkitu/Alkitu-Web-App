import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewUserForm } from "@/components/users/new-user-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewUserPage() {
  return (
    <div className="h-full p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Crear Usuario</h2>
        <Link href="/dashboard/users">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Usuario</CardTitle>
          <CardDescription>
            Completa los campos para crear un nuevo usuario en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewUserForm />
        </CardContent>
      </Card>
    </div>
  )
} 