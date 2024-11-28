"use server";
import prisma from "@/lib/config/prismaORM";
import { hash, compare } from "bcryptjs";
import {
  generatePasswordResetToken,
  validatePasswordResetToken,
} from "./token-service";
import { sendPasswordResetEmail } from "./email-service";
import { logActivity } from "./activity-service";

export async function initiatePasswordReset(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Retornamos éxito aunque el usuario no exista (seguridad)
    return { success: true };
  }

  const resetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, resetToken.token);

  return { success: true };
}

export async function resetPassword(token: string, newPassword: string) {
  const validation = await validatePasswordResetToken(token);

  if ("error" in validation) {
    return { error: validation.error };
  }

  const hashedPassword = await hash(newPassword, 12);

  const user = await prisma.user.findUnique({
    where: { email: validation.email },
  });

  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  // Actualizar contraseña
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      emailVerified: new Date(), // Verificamos el email si no estaba verificado
    },
  });

  // Eliminar token usado
  await prisma.passwordResetToken.deleteMany({
    where: { email: validation.email },
  });

  // Registrar actividad
  await logActivity({
    userId: user.id,
    type: "PASSWORD_RESET",
    details: "Contraseña restablecida exitosamente",
  });

  return { success: true };
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return { error: "Usuario no encontrado" };
    }

    // Verificar contraseña actual
    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return { error: "Contraseña actual incorrecta" };
    }

    // Hash de la nueva contraseña
    const hashedPassword = await hash(newPassword, 12);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Registrar actividad
    await logActivity({
      userId,
      type: "PASSWORD_CHANGE",
      details: "Contraseña cambiada por el usuario",
    });

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    return { error: "Error al cambiar la contraseña" };
  }
}
