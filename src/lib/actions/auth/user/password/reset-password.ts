"use server";

import prisma from "@/lib/config/prismaORM";
import { ResetSchema } from "@/lib/schemas/auth";
import { z } from "zod";
import { generatePasswordResetToken } from "../register/tokens";
import { sendPasswordResetEmail } from "@/lib/services/email-service";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Email inválido" };
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Email no encontrado" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email de recuperación enviado" };
};
