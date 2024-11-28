"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  CalendarIcon, 
  FolderIcon, 
  UsersIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  ChevronDown,
  Building2,
  Megaphone,
  GroupIcon,
  UserPlus
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MainNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
          <Link href="/dashboard">
            <LayoutDashboardIcon />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Megaphone />
              <span>Marketing Salon</span>
              <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/years"}>
                  <Link href="/dashboard/years">
                    <CalendarIcon />
                    <span>Años</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/clients"}>
                  <Link href="/dashboard/clients">
                    <UsersIcon />
                    <span>Clientes</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/campaigns"}>
                  <Link href="/dashboard/campaigns">
                    <FolderIcon />
                    <span>Campañas</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>

      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <UsersIcon />
              <span>Gestión de Usuarios</span>
              <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/users"}>
                  <Link href="/dashboard/users">
                    <UserPlus />
                    <span>Crear Usuario</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/groups"}>
                  <Link href="/dashboard/groups">
                    <GroupIcon />
                    <span>Grupos</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>

      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
          <Link href="/dashboard/settings">
            <Settings2Icon />
            <span>Configuración</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 