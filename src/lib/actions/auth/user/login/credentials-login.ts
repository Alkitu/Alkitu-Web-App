"use server";

import prisma from "@/lib/config/prismaORM";
import { LoginSchema } from "@/lib/schemas/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "../register/tokens";
import { z } from "zod";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/services/email-service";

const CredentialsSchema = LoginSchema.extend({
  code: z.string().optional(),
});

type CredentialsInput = z.infer<typeof CredentialsSchema>;

export const credentialsLogin = async (
  values: CredentialsInput,
  callbackUrl?: string | null
) => {
  const validatedFields = CredentialsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email no existe" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );

    return { error: "Email no verificado" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await prisma.twoFactorToken.findFirst({
        where: { email: existingUser.email },
      });

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Código inválido" };
      }

      const hasExpired = new Date() > new Date(twoFactorToken.expires);
      if (hasExpired) {
        return { error: "El código ha expirado" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation =
        await prisma.twoFactorConfirmation.findUnique({
          where: { userId: existingUser.id },
        });

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas" };
        default:
          return { error: "Algo salió mal" };
      }
    }
    throw error;
  }
};
