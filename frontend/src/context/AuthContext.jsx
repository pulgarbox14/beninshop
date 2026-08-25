import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const STORAGE_KEY = 'beninshop_user';

// Utilisateur connecte + JWT
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoading(false);
  }, []);

  const persist = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUser(data);
    return data;
  };

  const login = async (credentials) => persist(await authService.login(credentials));

  const register = async (payload) => persist(await authService.register(payload));

  const updateProfile = async (payload) => persist(await authService.updateProfile(payload));

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      updateProfile,
      logout,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit etre utilise a l'interieur de AuthProvider");
  }

  return context;
};
