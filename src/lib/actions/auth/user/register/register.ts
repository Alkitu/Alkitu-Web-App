"use server";

import * as z from "zod";
import { RegisterSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import  prisma  from "@/lib/config/prismaORM";
import { getUserByEmail } from "@/lib/data/auth";
import { generateVerificationToken } from "./tokens";
import { sendVerificationEmail } from "@/lib/services/email-service";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Datos inválidos" };
  }

  const { email, password, name, lastName, username } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "El email ya está registrado" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
        lastName,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );

    return { success: "Email de confirmación enviado!" };
  } catch (error) {
    return { error: "Error al crear el usuario" };
  }
};
