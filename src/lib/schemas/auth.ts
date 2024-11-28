import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
})

export const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
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
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export const EmailSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
})

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
export type ResetInput = z.infer<typeof ResetSchema>
export type NewPasswordInput = z.infer<typeof NewPasswordSchema>
export type EmailInput = z.infer<typeof EmailSchema> 