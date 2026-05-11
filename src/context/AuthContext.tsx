// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'CLIENTE' | 'ADMIN';
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar, recupera sesión guardada en localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('hotelbot_token');
    const savedUsuario = localStorage.getItem('hotelbot_usuario');
    if (savedToken && savedUsuario) {
      setToken(savedToken);
      setUsuario(JSON.parse(savedUsuario));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Error al iniciar sesión');
    }

    const data = await response.json();
    setToken(data.token);
    setUsuario(data.usuario);
    localStorage.setItem('hotelbot_token', data.token);
    localStorage.setItem('hotelbot_usuario', JSON.stringify(data.usuario));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('hotelbot_token');
    localStorage.removeItem('hotelbot_usuario');
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      token,
      isAdmin: usuario?.rol === 'ADMIN',
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
