"use server";
import prisma from "@/lib/config/prismaORM";
import { hash } from "bcryptjs";
import { generateVerificationToken } from "./token-service";
import { RegisterSchema } from "@/lib/schemas/auth";
import { Role } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function register(data: {
  email: string;
  password: string;
  name: string;
  lastName: string;
  username: string;
  role?: Role;
}) {
  try {
    const validatedFields = RegisterSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Campos inválidos" };
    }

    const { email, password, name, lastName, username } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return { error: "El email o nombre de usuario ya están registrados" };
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        username,
        password: hashedPassword,
        role: data.role || "CLIENT",
      },
    });

    // Generar token de verificación
    const verificationToken = await generateVerificationToken(email);

    // Construir URL de verificación
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken.token}`;

    // Enviar email de verificación
    try {
      const emailResult = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Verifica tu cuenta de Inside",
        html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu email - Inside</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; padding: 20px 0; background-color: #000;">
            <img src="https://inside.com/logo.png" alt="Inside Logo" width="150" style="max-width: 100%; height: auto;">
        </div>
        <div style="padding: 20px; background-color: #fff; border-radius: 8px; margin-top: 20px;">
            <h1 style="color: #000; font-size: 24px; margin-bottom: 20px; text-align: center;">Verifica tu email</h1>
            <p style="margin-bottom: 16px;">Hola ${username},</p>
            <p style="margin-bottom: 16px;">Gracias por registrarte en Inside. Por favor, verifica tu email haciendo click en el siguiente botón:</p>
            <div style="text-align: center; margin: 32px 0;">
                <a href="${verificationUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                    Verificar email
                </a>
            </div>
            <p style="margin-bottom: 16px;">Si no puedes hacer click en el botón, copia y pega este enlace en tu navegador:</p>
            <p style="margin-bottom: 16px; word-break: break-all; color: #0066cc;">${verificationUrl}</p>
            <p style="margin-bottom: 16px;">Si no has creado esta cuenta, puedes ignorar este email.</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p>© ${new Date().getFullYear()} Inside. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`,
      });

      if (emailResult.error) {
        console.error("Error sending email:", emailResult.error);
        return { error: "Error al enviar el email de verificación" };
      }

      console.log("Verification email sent successfully to:", email);
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      return { error: "Error al enviar el email de verificación" };
    }

    return {
      success: true,
      user,
      redirect: `/auth/verify?email=${encodeURIComponent(email)}`,
    };
  } catch (error) {
    console.error("Error in register service:", error);
    return { error: "Error al registrar usuario" };
  }
}
