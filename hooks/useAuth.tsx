"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode, 
  useCallback 
} from "react";
import { useRouter } from "next/navigation";
import { AuthState, AuthUser } from "@/types";
import { 
  authenticate, 
  persistUser, 
  getStoredUser, 
  clearStoredUser 
} from "@/lib/auth-utils";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });
  
  const router = useRouter();

  // Check for stored user on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = getStoredUser();
      
      if (storedUser) {
        setAuthState({
          user: storedUser,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await authenticate(email, password);
      
      if (user) {
        persistUser(user);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearStoredUser();
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
    router.push("/login");
  }, [router]);

  const value = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}