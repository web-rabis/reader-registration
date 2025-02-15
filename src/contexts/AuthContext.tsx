
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('librarian-token');
  });
  const navigate = useNavigate();
  const location = useLocation();

  const login = (token: string) => {
    localStorage.setItem('librarian-token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('librarian-token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const path = location.pathname;
    if (isAuthenticated && (path === '/login' || path === '/')) {
      navigate('/dashboard', { replace: true });
    } else if (!isAuthenticated && path !== '/' && path !== '/login') {
      navigate('/login', { replace: true });
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
