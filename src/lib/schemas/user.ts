import { z } from "zod"
import { Role } from "@prisma/client"

export const NewUserSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  lastName: z.string().min(2, {
    message: "Los apellidos deben tener al menos 2 caracteres",
  }),
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  role: z.enum([Role.ADMIN, Role.EMPLOYEE, Role.CLIENT]),
  isTwoFactorEnabled: z.boolean().default(false),
}) 