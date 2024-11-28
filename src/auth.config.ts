import type { DefaultSession, NextAuthConfig, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/config/prismaORM";
import { Role } from "@prisma/client";

export default {
  providers: [
    GitHub, // Configuración del proveedor de Google
    Google({
      clientId:
        "1014725709960-j00f1pdf5n4o503a95npudkk151upfq8.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          lastLogin: new Date(),
        },
      });
    },
    async signIn({ user }) {
      if (!user?.id) {
        throw new Error("User ID is undefined");
      }

      await prisma.activityLog.create({
        data: {
          userId: user.id,
          type: "LOGIN",
          details: "User logged in successfully",
          timestamp: new Date(),
        },
      });
    },
    async signOut(message: { session: any } | { token: any }) {
      const userId =
        "token" in message ? message.token?.sub : message.session?.user?.id;
      if (!userId) return;

      await prisma.activityLog.create({
        data: {
          userId,
          type: "LOGOUT",
          details: "User logged out",
          timestamp: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? "" },
        });

        if (existingUser) {
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account?.type || "",
                provider: account?.provider || "",
                providerAccountId: account?.providerAccountId || "",
                refresh_token: account?.refresh_token,
                access_token: account?.access_token,
                expires_at: account?.expires_at,
                token_type: account?.token_type,
                scope: account?.scope,
                id_token: account?.id_token,
                session_state: account?.session_state?.toString() ?? "",
              },
            });
          }

          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              lastLogin: new Date(),
              image: user.image || existingUser.image,
              emailVerified: new Date(),
            },
          });
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              image: user.image,
              emailVerified: new Date(),
              lastLogin: new Date(),
              username: user.email!.split("@")[0],
              lastName: "",
              role: Role.CLIENT,
            },
          });

          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account?.type || "",
              provider: account?.provider || "",
              providerAccountId: account?.providerAccountId || "",
              refresh_token: account?.refresh_token,
              access_token: account?.access_token,
              expires_at: account?.expires_at,
              token_type: account?.token_type,
              scope: account?.scope,
              id_token: account?.id_token,
              session_state: account?.session_state?.toString() ?? "",
            },
          });
        }
      }

      return true;
    },
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;
        token.groups = user.groups || [];
      }

      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: any }) {
      if (token.id) {
        session.user = {
          ...(session.user || {}),
          id: token.id,
          role: token.role as Role,
          username: token.username as string,
          isTwoFactorEnabled: token.isTwoFactorEnabled as boolean,
          groups: token.groups as string[],
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
} satisfies NextAuthConfig;
