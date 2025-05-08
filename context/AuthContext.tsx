'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, fetchWithAuth } from '@/lib/api';
import { AuthState, LoginCredentials, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Initial auth state
const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Create the context
const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}>({
  authState: initialState,
  login: async () => {},
  logout: () => {},
  isAdmin: () => false,
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const router = useRouter();
  const { toast } = useToast();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const userJson = localStorage.getItem('user');

      if (token && userJson) {
        try {
          const user: User = JSON.parse(userJson);
          setAuthState({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Invalid stored user data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState({ ...initialState, isLoading: false });
        }
      } else {
        setAuthState({ ...initialState, isLoading: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      
      // Store auth data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAuthState({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: 'Login successful',
        description: `Welcome, ${response.user.name}!`,
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: (error as Error).message || 'Invalid credentials',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });

    router.push('/login');
  };

  // Check if user is admin
  const isAdmin = (): boolean => {
    return authState.user?.role === 'Admin';
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);