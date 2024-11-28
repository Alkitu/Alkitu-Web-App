"use server";
import prisma from "@/lib/config/prismaORM";

export type ActivityType =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "PASSWORD_RESET"
  | "ACCOUNT_LOCKED"
  | "PASSWORD_CHANGE"
  | "PASSWORD_SET";

export async function logActivity(data: {
  userId: string;
  type: ActivityType;
  details?: string;
  ip?: string;
  userAgent?: string;
}) {
  await prisma.activityLog.create({
    data: {
      ...data,
      timestamp: new Date(),
    },
  });
}
