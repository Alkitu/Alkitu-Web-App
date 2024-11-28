"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  try {
    await signOut();
    return { success: "Sesión cerrada correctamente" };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { error: "Error al cerrar sesión" };
  }
};
