"use server";

import { EmailSchema } from "@/lib/schemas/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export const emailLogin = async (
  values: z.infer<typeof EmailSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = EmailSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Email inválido" };
  }

  const { email } = validatedFields.data;

  try {
    await signIn("email", {
      email,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "EmailSignInError":
          return { error: "Error al enviar el email" };
        default:
          return { error: "Algo salió mal" };
      }
    }
    throw error;
  }

  return { success: "Email enviado!" };
};
