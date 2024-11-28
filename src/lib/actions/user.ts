'use server'

import prisma from "@/lib/config/prismaORM"
import { revalidatePath } from "next/cache"
import { hash } from "bcryptjs"
import { generatePassword } from "@/lib/utils"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface CreateUserResponse {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    email: string;
    name: string;
    username: string;
    password?: string;
  };
}

export async function getUsers(query?: string) {
  try {
    return await prisma.user.findMany({
      where: query ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
        ]
      } : undefined,
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch {
    return []
  }
}

interface CreateUserData {
  username: string;
  email: string;
  name: string;
  lastName: string;
  role: "ADMIN" | "EMPLOYEE" | "CLIENT";
  sendEmail?: boolean;
}

export async function createUser(data: CreateUserData): Promise<CreateUserResponse> {
  try {
    const exists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username }
        ]
      }
    })

    if (exists) {
      return { 
        success: false, 
        error: 'Ya existe un usuario con ese email o nombre de usuario' 
      }
    }

    // Generar contraseña segura
    const password = generatePassword()
    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    })

    if (data.sendEmail) {
      try {
        await resend.emails.send({
          from: 'Inside <no-reply@inside.com>',
          to: user.email ?? '',
          subject: 'Bienvenido a Inside - Tus credenciales de acceso',
          html: `
            <h1>Bienvenido a Inside</h1>
            <p>Hola ${user.name},</p>
            <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales de acceso:</p>
            <ul>
              <li><strong>Usuario:</strong> ${user.username}</li>
              <li><strong>Contraseña:</strong> ${password}</li>
            </ul>
            <p>Por favor, cambia tu contraseña después de iniciar sesión.</p>
            <p>Saludos,<br>El equipo de Inside</p>
          `
        })
      } catch (error) {
        console.error('Error sending email:', error)
      }
    }

    revalidatePath('/dashboard/users')
    return { 
      success: true, 
      data: {
        id: user.id,
        email: user.email ?? '',
        name: user.name ?? '',
        username: user.username,
        password: password
      }
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return { 
      success: false, 
      error: 'Error al crear el usuario' 
    }
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    revalidatePath('/dashboard/users')
    return { success: true }
  } catch {
    return { success: false, error: 'Error al eliminar el usuario' }
  }
} 