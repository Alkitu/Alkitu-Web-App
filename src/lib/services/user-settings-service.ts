"use server";

import prisma from "@/lib/config/prismaORM";
import { hash, compare } from "bcryptjs";
import { logActivity } from "./activity-service";

export async function setPassword(userId: string, password: string) {
  const hashedPassword = await hash(password, 12);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      emailVerified: new Date(), // Verificamos el email si no estaba verificado
    },
  });

  await logActivity({
    userId,
    type: "PASSWORD_SET",
    details: "Contraseña establecida por primera vez",
  });

  return { success: true };
}

export async function changePassword(
  userId: string,
  currentPassword: string | null,
  newPassword: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { success: false, error: "Usuario no encontrado" };
  }

  // Si el usuario tiene contraseña actual, verificarla
  if (user.password) {
    if (!currentPassword) {
      return {
        success: false,
        error: "Debe proporcionar la contraseña actual",
      };
    }

    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return { success: false, error: "Contraseña actual incorrecta" };
    }
  }

  const hashedPassword = await hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  await logActivity({
    userId,
    type: "PASSWORD_CHANGE",
    details: user.password
      ? "Contraseña cambiada"
      : "Contraseña establecida por primera vez",
  });

  return { success: true };
}
