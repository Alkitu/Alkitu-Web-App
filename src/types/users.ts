export type UserRole = "ADMIN" | "EMPLOYEE" | "CLIENT";

export type User = {
  id: string;
  username: string;
  email: string | null;
  name: string | null;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}; 