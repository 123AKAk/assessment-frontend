import { Role, User, Permission, AuthUser } from "@/types";
import { adminUser, managerUser, regularUser } from "@/lib/data";

// Simulate authentication with a simple email/password check
export async function authenticate(
  email: string,
  password: string
): Promise<AuthUser | null> {
  // This would normally verify against a backend API
  // For demo purposes, we'll accept any password and check only the email
  
  if (email === "admin@example.com") {
    return adminUser;
  } else if (email === "manager@example.com") {
    return managerUser;
  } else if (email === "user@example.com") {
    return regularUser;
  }
  
  return null;
}

// Check if a user has a specific permission
export function hasPermission(user: AuthUser | null, permissionId: string): boolean {
  if (!user) return false;
  
  return user.role.permissions.some(permission => permission.id === permissionId);
}

// Store user in localStorage
export function persistUser(user: AuthUser): void {
  localStorage.setItem('user', JSON.stringify(user));
}

// Get user from localStorage
export function getStoredUser(): AuthUser | null {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as AuthUser;
  } catch {
    return null;
  }
}

// Remove user from localStorage
export function clearStoredUser(): void {
  localStorage.removeItem('user');
}