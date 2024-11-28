"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inside Email</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #000;
        }
        .content {
            padding: 20px;
            background-color: #fff;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://inside.com/logo.png" alt="Inside Logo" width="150">
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Inside. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`;

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  const username = email.split("@")[0];

  const content = `
    <h1>Verifica tu email</h1>
    <p>Hola ${username},</p>
    <p>Gracias por registrarte en Inside. Por favor, verifica tu email haciendo click en el siguiente botón:</p>
    <p style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verificar email</a>
    </p>
    <p>Si no puedes hacer click en el botón, copia y pega este enlace en tu navegador:</p>
    <p>${verificationUrl}</p>
    <p>Si no has creado esta cuenta, puedes ignorar este email.</p>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Verifica tu cuenta de Inside",
    html: baseEmailTemplate(content),
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;
  const username = email.split("@")[0];

  const content = `
    <h1>Restablecer contraseña</h1>
    <p>Hola ${username},</p>
    <p>Has solicitado restablecer tu contraseña. Haz click en el siguiente botón para crear una nueva:</p>
    <p style="text-align: center;">
        <a href="${resetUrl}" class="button">Restablecer contraseña</a>
    </p>
    <p>Este enlace expirará en 2 horas.</p>
    <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Restablecer tu contraseña",
    html: baseEmailTemplate(content),
  });
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  const username = email.split("@")[0];

  const content = `
    <h1>Código de verificación</h1>
    <p>Hola ${username},</p>
    <p>Tu código de verificación es:</p>
    <h2 style="text-align: center; font-size: 32px; letter-spacing: 5px;">${token}</h2>
    <p>Este código expirará en 10 minutos.</p>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Código de verificación 2FA",
    html: baseEmailTemplate(content),
  });
}

export async function sendLoginAlertEmail(
  email: string,
  attempts: number,
  isLocked: boolean
) {
  const content = `
    <h1>Alerta de Seguridad</h1>
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px;">
      <p><strong>Usuario:</strong> ${email}</p>
      <p><strong>Intentos fallidos:</strong> ${attempts}</p>
      <p><strong>Estado:</strong> ${
        isLocked ? "Cuenta bloqueada" : "Próximo a bloqueo"
      }</p>
      <p><strong>Último intento:</strong> ${new Date().toLocaleString()}</p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    subject: "Alerta de Seguridad - Intentos fallidos de inicio de sesión",
    html: baseEmailTemplate(content),
  });
}
