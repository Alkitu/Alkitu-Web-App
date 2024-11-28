import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  ...authConfig,
});
