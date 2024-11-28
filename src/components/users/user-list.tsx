"use client"

import * as React from "react"
import { User, UserRole } from "@/types/users"
import { deleteUser } from "@/lib/actions/user"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { TrashIcon, PencilIcon } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserListProps {
  users: User[]
}

const roleColors = {
  ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  EMPLOYEE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  CLIENT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
}

export function UserList({ users: initialUsers }: UserListProps) {
  const [users, setUsers] = React.useState(initialUsers)
  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<UserRole | "ALL">("ALL")

  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const matchesSearch = search === "" || 
        (user.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (user.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        user.username.toLowerCase().includes(search.toLowerCase())

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [users, search, roleFilter])

  const handleDelete = async (id: string) => {
    const result = await deleteUser(id)
    if (result.success) {
      setUsers(users.filter(user => user.id !== id))
      toast.success("Usuario eliminado correctamente")
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={roleFilter}
          onValueChange={(value: UserRole | "ALL") => setRoleFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="EMPLOYEE">Empleado</SelectItem>
            <SelectItem value="CLIENT">Cliente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${user.name} ${user.lastName}`}</TableCell>
              <TableCell>
                <Badge className={roleColors[user.role]} variant="outline">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* TODO: Implementar edición */}}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 