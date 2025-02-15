
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const login = useCallback((token: string) => {
    localStorage.setItem('librarian-token', token);
    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('librarian-token');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }, [navigate]);

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
