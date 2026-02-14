'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import apiService from '@/services/api';

interface User {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Token'ı localStorage'dan yükle
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
      // Token'ı validate et
      validateToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (tokenToValidate: string) => {
    try {
      await apiService.validateToken(tokenToValidate);
      setIsLoading(false);
    } catch (error) {
      // Token geçersiz, logout yap
      logout();
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(username, password) as {
        token: string;
        username: string;
        email: string;
        role: string;
      } | null;

      // Yanlış şifre durumunda null döner
      if (!response) {
        return false;
      }

      setToken(response.token);
      setUser({
        username: response.username,
        email: response.email,
        role: response.role,
      });

      // LocalStorage'a kaydet
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify({
        username: response.username,
        email: response.email,
        role: response.role,
      }));

      return true;
    } catch (error) {
      // Rate limit veya bağlantı hatası: mesajı kullanıcıya göstermek için yukarı fırlat
      if (error instanceof Error && ((error as any).isRateLimitError || error.message.includes('bağlanılamadı') || error.message.includes('Çok fazla giriş'))) {
        throw error;
      }
      if (error instanceof Error && !(error as any).isAuthError) {
        console.error('Login error:', error);
      }
      return false;
    }
  };

  const logout = () => {
    // State'i temizle
    setToken(null);
    setUser(null);
    setIsLoading(false);
    
    // LocalStorage'ı temizle
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Login sayfasına yönlendir
    router.push('/admin/login');
    router.refresh(); // Sayfayı yenile
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
