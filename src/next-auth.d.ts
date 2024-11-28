import { Role } from "@prisma/client";
import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      username: string;
      isTwoFactorEnabled: boolean;
      groups: string[];
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    username: string;
    isTwoFactorEnabled: boolean;
    groups?: string[];
  }

  interface JWT {
    role: Role;
    username: string;
    isTwoFactorEnabled: boolean;
    groups: string[];
  }
}
