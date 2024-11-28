"use server";

import prisma from "@/lib/config/prismaORM";
import { NewPasswordSchema } from "@/lib/schemas/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Token no proporcionado" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Contraseña inválida" };
  }

  const { password } = validatedFields.data;

  try {
    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return { error: "Token inválido" };
    }

    const hasExpired = new Date() > new Date(existingToken.expires);
    if (hasExpired) {
      await prisma.passwordResetToken.delete({
        where: { id: existingToken.id },
      });
      return { error: "Token expirado" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) {
      return { error: "Email no existe" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Contraseña actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    return { error: "Error al actualizar la contraseña" };
  }
};
