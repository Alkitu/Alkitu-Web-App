export type UserRole = "ADMIN" | "EMPLOYEE" | "CLIENT"; // Ensure CLIENT is included

export type User = {
  id: string;
  username: string;  // Nombre de usuario para login
  email: string;
  name: string;      // Nombre completo
  lastName: string;  // Apellidos
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}; 