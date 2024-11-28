"use server";
import prisma from "@/lib/config/prismaORM";
import { logActivity } from "@/lib/services/activity-service";
import { sendLoginAlertEmail } from "@/lib/services/email-service";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION = 6 * 60 * 60 * 1000; // 6 horas en milisegundos
const NOTIFICATION_THRESHOLD = 5; // Enviar notificación después de 5 intentos

export async function handleFailedLogin(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const attempts = user.failedLoginAttempts + 1;
  const shouldLock = attempts >= MAX_LOGIN_ATTEMPTS;
  const shouldNotify = attempts === NOTIFICATION_THRESHOLD;

  await prisma.user.update({
    where: { email },
    data: {
      failedLoginAttempts: attempts,
      lastFailedLogin: new Date(),
      lockedUntil: shouldLock ? new Date(Date.now() + LOCK_DURATION) : null,
    },
  });

  await logActivity({
    userId: user.id,
    type: "LOGIN_FAILED",
    details: `Intento fallido #${attempts}${
      shouldLock ? " - Cuenta bloqueada" : ""
    }`,
  });

  if (shouldNotify || shouldLock) {
    await sendLoginAlertEmail(email, attempts, shouldLock);
  }
}

export async function resetFailedAttempts(email: string) {
  await prisma.user.update({
    where: { email },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });
}

export async function isAccountLocked(
  email: string
): Promise<{ locked: boolean; remainingMinutes?: number }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { locked: false };

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const remainingTime = Math.ceil(
      (user.lockedUntil.getTime() - Date.now()) / (1000 * 60)
    );
    return {
      locked: true,
      remainingMinutes: remainingTime,
    };
  }

  return { locked: false };
}

export async function handleSuccessfulLogin(
  userId: string,
  ip?: string,
  userAgent?: string
) {
  try {
    await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: {
          failedLoginAttempts: 0,
          lockedUntil: null,
          lastLogin: new Date(),
        },
      }),
      logActivity({
        userId,
        type: "LOGIN_SUCCESS",
        ip,
        userAgent,
        details: "Inicio de sesión exitoso",
      }),
    ]);
  } catch (error) {
    console.error("Error handling successful login:", error);
  }
}
