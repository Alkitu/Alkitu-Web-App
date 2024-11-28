"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createUser } from "@/lib/actions/user"
import { toast } from "sonner"
import { UserRole } from "@/types/users"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    role: "CLIENT" as UserRole,
    sendEmail: true
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const result = await createUser(formData)
    if (result.success) {
      toast.success("Usuario creado correctamente", {
        description: result.data && result.data.password ? 
          `Contraseña generada: ${result.data.password}` : 
          undefined,
        duration: 10000
      })
      setFormData({
        username: "",
        email: "",
        name: "",
        lastName: "",
        role: "CLIENT",
        sendEmail: true
      })
    } else {
      toast.error(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Información de Usuario</CardTitle>
          <CardDescription>
            Ingrese los datos del nuevo usuario
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              placeholder="Apellidos"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>

          <Select
            value={formData.role}
            onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione el rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Administrador</SelectItem>
              <SelectItem value="EMPLOYEE">Empleado</SelectItem>
              <SelectItem value="CLIENT">Cliente</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendEmail"
              checked={formData.sendEmail}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, sendEmail: checked as boolean }))
              }
            />
            <label
              htmlFor="sendEmail"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enviar credenciales por email
            </label>
          </div>

          <Button type="submit" className="w-full">
            Crear Usuario
          </Button>
        </CardContent>
      </Card>
    </form>
  )
} 