import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored auth data on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setAuthState({
        user: JSON.parse(userData),
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - in production, this would be an actual API call
      const response = await mockApiCall('/auth/login', { email, password });
      
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      // Mock API call
      const response = await mockApiCall('/auth/register', userData);
      
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API call function - in production, replace with actual API calls
const mockApiCall = (endpoint: string, data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful response
      if (endpoint === '/auth/login') {
        resolve({
          data: {
            user: {
              id: '1',
              email: data.email,
              name: 'John Doe',
              phone: '+1234567890',
              role: 'buyer',
              isVerified: true,
              createdAt: new Date().toISOString(),
            },
            token: 'mock-jwt-token',
          },
        });
      } else if (endpoint === '/auth/register') {
        resolve({
          data: {
            user: {
              id: Math.random().toString(36),
              email: data.email,
              name: data.name,
              phone: data.phone,
              role: data.role || 'buyer',
              isVerified: false,
              createdAt: new Date().toISOString(),
            },
            token: 'mock-jwt-token',
          },
        });
      }
    }, 1000);
  });
};