"use client";

import { useState, useEffect, useCallback, useContext, createContext, ReactNode } from "react";
import { User, PaginationState, Role } from "@/types";
import { sampleUsers } from "@/lib/data";

// Define the context value type
interface UsersContextType {
  users: User[];
  filteredUsers: User[];
  pagination: PaginationState;
  isLoading: boolean;
  searchTerm: string;
  selectedStatus: string;
  selectedRole: string;
  totalPages: number;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedStatus: (status: string) => void;
  setSelectedRole: (role: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

// Create the context
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Provider component
export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // In a real app, this would be an API call
        // For this demo, we'll use the sample data
        const storedUsers = localStorage.getItem("users");
        
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          setUsers(sampleUsers);
          localStorage.setItem("users", JSON.stringify(sampleUsers));
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filter and paginate users when dependencies change
  useEffect(() => {
    // Apply filters
    let result = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }

    if (selectedStatus) {
      result = result.filter(user => user.status === selectedStatus);
    }

    if (selectedRole) {
      result = result.filter(user => user.role.id === selectedRole);
    }

    // Update pagination
    const total = result.length;
    setPagination(prev => ({ ...prev, total }));

    // Apply pagination
    const start = (pagination.page - 1) * pagination.pageSize;
    const paginatedResult = result.slice(start, start + pagination.pageSize);

    setFilteredUsers(paginatedResult);
  }, [users, searchTerm, selectedStatus, selectedRole, pagination.page, pagination.pageSize]);

  // Calculate total pages
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  // Set page
  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  // Set page size
  const setPageSize = useCallback((pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  // Add user
  const addUser = useCallback((userData: Omit<User, "id" | "createdAt">) => {
    setUsers(prev => {
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      const updatedUsers = [...prev, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }, []);

  // Update user
  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers(prev => {
      const updatedUsers = prev.map(user =>
        user.id === id ? { ...user, ...updates } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }, []);

  // Delete user
  const deleteUser = useCallback((id: string) => {
    setUsers(prev => {
      const updatedUsers = prev.filter(user => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }, []);

  const value: UsersContextType = {
    users,
    filteredUsers,
    pagination,
    isLoading,
    searchTerm,
    selectedStatus,
    selectedRole,
    totalPages,
    setSearchTerm,
    setSelectedStatus,
    setSelectedRole,
    setPage,
    setPageSize,
    addUser,
    updateUser,
    deleteUser,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

// Custom hook to use the users context
export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}