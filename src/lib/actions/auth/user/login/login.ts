"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/schemas/auth";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/data/auth";
import { generateVerificationToken } from "../register/tokens";
import { sendVerificationEmail } from "@/lib/services/email-service";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciales inválidas" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "El email o la contraseña son incorrectos" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );

    return {
      error:
        "Email no verificado. Se ha enviado un nuevo enlace de verificación.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
