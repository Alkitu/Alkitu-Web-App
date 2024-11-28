import { NextResponse } from "next/server";
import prisma from "@/lib/config/prismaORM";
import { hash } from "bcryptjs";
import { NewUserSchema } from "@/lib/schemas/user";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedFields = NewUserSchema.safeParse(data);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { email, password, username } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El email o nombre de usuario ya están registrados" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        ...validatedFields.data,
        password: hashedPassword,
        emailVerified: new Date(), // Usuario creado por admin ya está verificado
      },
    });

    // Registrar actividad
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        type: "USER_CREATED",
        details: "Usuario creado por administrador",
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
