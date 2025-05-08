// API client for making requests to the backend

import { ApiError, LoginCredentials, LoginResponse, User, UsersResponse } from './types';

const API_BASE_URL = 'https://assessment-backend-ticn.onrender.com/api';

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<ApiError> => {
  try {
    const errorData = await response.json();
    return {
      message: errorData.message || 'An unexpected error occurred',
      status: response.status,
    };
  } catch (error) {
    return {
      message: 'Failed to process response',
      status: response.status,
    };
  }
};

// Helper function to make authenticated API requests
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if ((error as ApiError).status === 401) {
      // Clear authentication if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error;
  }
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Users API
export const usersApi = {
  getUsers: async (
    page = 1,
    limit = 10,
    search = '',
    status = ''
  ): Promise<UsersResponse> => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search ? { search } : {}),
      ...(status ? { status } : {}),
    }).toString();

    return fetchWithAuth(`/users?${query}`);
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    return fetchWithAuth('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    return fetchWithAuth(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    return fetchWithAuth(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};