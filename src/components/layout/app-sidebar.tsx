"use client"

import { MainNav } from "@/components/layout/main-nav"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { ChevronDown, ChevronUp, User2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function AppSidebar() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/login" })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Espacio de Trabajo
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem>
                  <span>Workspace 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Workspace 2</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Workspace 3</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <MainNav />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="h-5 w-5" />
                  <span>Usuario</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side="top" 
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
} 