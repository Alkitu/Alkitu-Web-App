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
