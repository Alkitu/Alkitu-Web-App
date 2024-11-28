import { NextResponse } from "next/server"
import { register } from "@/lib/services/register-service"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const result = await register(data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    )
  }
} 