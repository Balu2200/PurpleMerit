import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  const persistSession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('token', nextToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: nextToken, user: nextUser } = response.data.data;
    persistSession(nextToken, nextUser);
    return nextUser;
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    const { token: nextToken, user: nextUser } = response.data.data;
    persistSession(nextToken, nextUser);
    return nextUser;
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const fetchCurrentUser = async () => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      return null;
    }

    try {
      const response = await api.get('/users/me');
      const nextUser = response.data.data;
      setUser(nextUser);
      localStorage.setItem('user', JSON.stringify(nextUser));
      return nextUser;
    } catch {
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasToken = localStorage.getItem('token');
    if (hasToken && !user) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
    fetchCurrentUser,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
