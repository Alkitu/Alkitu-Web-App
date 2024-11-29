### README.md

Este proyecto implementa un sistema de autenticación robusto y seguro basado en **NextAuth.js v5** con integración a **Prisma** y **MongoDB**, diseñado para gestionar usuarios, roles y permisos, autenticación de dos factores (2FA), y manejo de actividad de usuarios.

---

## Características

- **NextAuth.js v5** para autenticación segura.
- **Prisma ORM** con MongoDB como base de datos.
- Soporte para:
  - **JWT** con personalización de payload.
  - Proveedores OAuth2 (Google y GitHub).
  - Verificación de correo electrónico.
  - Restablecimiento y cambio de contraseña.
  - Manejo de roles y permisos.
  - Registro de actividad del usuario.
- Integración con servicios de correo electrónico para notificaciones.
- Seguridad avanzada:
  - Bloqueo de cuentas tras intentos fallidos.
  - Notificaciones por intentos de inicio de sesión fallidos.
  - Autenticación de dos factores (pendiente de implementación).

---

## Requisitos Previos

1. Node.js v16 o superior.
2. MongoDB como base de datos.
3. Prisma CLI instalado.
4. Variables de entorno configuradas en `.env`.

---

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/inside-auth/inside-auth.git
   cd inside-auth
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```env
   DATABASE_URL=mongodb+srv://<user>:<password>@<cluster.url>/<database>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXTAUTH_URL=http://localhost:3000
   AUTH_GOOGLE_ID=<your-google-client-id>
   AUTH_GOOGLE_SECRET=<your-google-client-secret>
   AUTH_GITHUB_ID=<your-github-client-id>
   AUTH_GITHUB_SECRET=<your-github-client-secret>
   RESEND_API_KEY=<your-resend-api-key>
   EMAIL_FROM=noreply@insidehair.es
   ADMIN_EMAIL=patricia@insidesalons.com
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Configura Prisma:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── (lang)/            # Rutas multilenguaje
│   ├── (private)/         # Rutas protegidas
│   │   ├── (clients)/     # Rutas accesibles para clientes
│   │   ├── (admin)/       # Rutas accesibles para administradores
│   ├── auth/              # Rutas de autenticación
│   ├── error/             # Página de errores de autenticación
│   └── verify/            # Página de verificación de cuenta
├── components/            # Componentes de UI reutilizables
├── lib/                   # Configuración y servicios
│   ├── config/            # Configuración de Prisma
│   ├── services/          # Lógica de negocio
│   │   ├── activity-service.ts
│   │   ├── auth-service.ts
│   │   ├── email-service.ts
│   │   ├── password-service.ts
│   │   ├── register-service.ts
│   │   └── token-service.ts
├── schemas/               # Validaciones y esquemas de datos
└── pages/                 # Páginas de Next.js
```

---

## Funcionalidades

### Autenticación

- **Login y Registro:** OAuth con Google y GitHub.
- **Verificación de correo:** Enlace enviado tras el registro.
- **Gestión de contraseñas:** Restablecimiento y cambio de contraseñas.
- **Bloqueo de cuentas:** Bloquea tras 5 intentos fallidos.

### Roles y Permisos (pendiente de documentación)

- **ADMIN:** CRUD completo.
- **EMPLOYEE:** Permisos CRU.
- **CLIENT:** Acceso limitado a rutas agrupadas bajo `(clients)`.

### Gestión de Actividad

- **Registro de eventos:** Inicio/cierre de sesión, intentos fallidos, cambios de contraseña.
- **Alertas de seguridad:** Notificaciones de múltiples intentos fallidos.

### Autenticación de Dos Factores (pendiente de implementación)

- Tokens de un solo uso enviados al correo.

---

## Endpoints Principales

- **Rutas Públicas:**

  - `/login` - Inicio de sesión.
  - `/register` - Registro de nuevos usuarios.
  - `/verify` - Verificación de correo electrónico.
  - `/error` - Página de errores.

- **Rutas Privadas:**
  - `/private/admin` - Panel de administración (ADMIN y EMPLOYEE).
  - `/private/clients` - Panel de clientes.

---

## Cómo Contribuir

1. Crea un fork del repositorio.
2. Clona tu fork y crea una nueva rama:
   ```bash
   git checkout -b feature/tu-feature
   ```
3. Realiza tus cambios y envía un pull request.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## Contacto

Si tienes preguntas o necesitas soporte, contacta al equipo en **support@inside.com**.

```

```
