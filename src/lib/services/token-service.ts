"use server";

import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/config/prismaORM";
import crypto from "crypto";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600000); // 1 hora

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const validatePasswordResetToken = async (token: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { token },
    });

    if (!resetToken) {
      return { error: "Token inválido" };
    }

    if (new Date() > new Date(resetToken.expires)) {
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });
      return { error: "Token expirado" };
    }

    return { email: resetToken.email };
  } catch (error) {
    return { error: "Error al validar el token" };
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600000); // 1 hora

  const existingToken = await prisma.verificationToken.findFirst({
    where: { identifier: email },
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const validateVerificationToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      return { error: "Token inválido" };
    }

    if (new Date() > new Date(verificationToken.expires)) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return { error: "Token expirado" };
    }

    const user = await prisma.user.findFirst({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    // Eliminar el token usado
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { email: verificationToken.identifier };
  } catch (error) {
    console.error("Error validating token:", error);
    return { error: "Error al validar el token" };
  }
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 600000); // 10 minutos

  const existingToken = await prisma.twoFactorToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const validateTwoFactorToken = async (token: string, email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        email,
        token,
        expires: { gt: new Date() },
      },
    });

    if (!twoFactorToken) {
      return false;
    }

    await prisma.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });

    return true;
  } catch {
    return false;
  }
};
