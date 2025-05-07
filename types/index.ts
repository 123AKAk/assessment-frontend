// User management types
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  id: string;
  name: string;
  description: string;
};

// Authentication types
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Pagination types
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}