// Define type definitions for the application

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'active' | 'inactive';
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UsersResponse {
  users: User[];
  totalPages: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
}