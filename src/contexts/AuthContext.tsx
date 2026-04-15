
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {User} from "@/types/api.ts";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user:User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('librarian-token') && !!localStorage.getItem('librarian-user');
  });
  const navigate = useNavigate();
  const location = useLocation();

  const login = (token: string, user:User) => {
    localStorage.setItem('librarian-token', token);
    localStorage.setItem('librarian-user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('librarian-token');
    localStorage.removeItem('librarian-user');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const path = location.pathname;
    const BASENAME = import.meta.env.VITE_APP_BASENAME || "/";
    if (isAuthenticated && (path === '/login' || path === '/')) {
      navigate(`${BASENAME}admin`, { replace: true });
    } else if (!isAuthenticated && path !== '/' && path !== '/login') {
      navigate(`${BASENAME}login`, { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
