import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { login as apiLogin, createAdmin as apiCreateAdmin, me } from "./authApi";
import { setAuthToken } from "./authStore";

const STORAGE_KEY = "frebrico_admin_token";

type User = { email: string; isAdmin: boolean } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  createAdmin: (email: string, password: string, isAdmin: boolean) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t) {
      setUser(null);
      setToken(null);
      setAuthToken(null);
      setLoading(false);
      return;
    }
    try {
      const u = await me(t);
      setUser(u);
      setToken(t);
      setAuthToken(t);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      setToken(null);
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const { token: t, user: u } = await apiLogin(email, password);
    localStorage.setItem(STORAGE_KEY, t);
    setToken(t);
    setUser(u);
    setAuthToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
    setAuthToken(null);
  }, []);

  const createAdmin = useCallback(async (email: string, password: string, isAdmin: boolean) => {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t) throw new Error("Not logged in");
    await apiCreateAdmin(email, password, isAdmin, t);
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    loading,
    login,
    logout,
    createAdmin,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
