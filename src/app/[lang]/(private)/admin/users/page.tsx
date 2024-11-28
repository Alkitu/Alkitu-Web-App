import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { getUsers } from "@/lib/actions/user"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { UserList } from "@/components/users/user-list"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="h-full p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
        <Link href="/dashboard/users/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div className="p-4 border rounded-lg">
        <Suspense fallback={<div>Cargando...</div>}>
          <UserList users={users} />
        </Suspense>
      </div>
    </div>
  )
} 