"use client"

import { User } from "@/types/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PencilIcon, TrashIcon } from "lucide-react"
import { deleteUser } from "@/lib/actions/user"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UserProfileProps {
  user: User & {
    groups?: { name: string }[]
    clients?: { name: string }[]
  }
}

export function UserProfile({ user }: UserProfileProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      const result = await deleteUser(user.id)
      if (result.success) {
        toast.success("Usuario eliminado correctamente")
        router.push("/dashboard/users")
      } else {
        toast.error(result.error)
      }
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Nombre completo</p>
            <p className="text-lg">{user.name} {user.lastName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Nombre de usuario</p>
            <p className="text-lg">{user.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Rol</p>
            <Badge>{user.role}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accesos y Permisos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Grupos</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.groups?.map((group) => (
                <Badge key={group.name} variant="secondary">
                  {group.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Clientes Asignados</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.clients?.map((client) => (
                <Badge key={client.name} variant="outline">
                  {client.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2 flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push(`/dashboard/users/${user.id}/edit`)}>
          <PencilIcon className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <TrashIcon className="h-4 w-4 mr-2" />
          Eliminar
        </Button>
      </div>
    </div>
  )
} 