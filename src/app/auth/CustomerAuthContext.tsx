import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  customerLogin,
  customerMe,
  customerRegister,
  type CustomerProfile,
  type CustomerUser,
  updateCustomerProfile,
} from "./customerAuthApi";

const STORAGE_KEY = "frebrico_customer_token";

type CustomerAuthContextValue = {
  user: CustomerUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    name: string;
    address: string;
    region: string;
    district: string;
    locality: string;
    postalCode: string;
    phone: string;
    birthDate: string;
    nif: string;
    acceptedPrivacyPolicy: boolean;
  }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  saveProfile: (profile: CustomerProfile) => Promise<void>;
};

const CustomerAuthContext = createContext<CustomerAuthContextValue | null>(null);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      const me = await customerMe(t);
      setUser(me);
      setToken(t);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const { token: t } = await customerLogin(email, password);
    localStorage.setItem(STORAGE_KEY, t);
    setToken(t);
    const me = await customerMe(t);
    setUser(me);
  }, []);

  const register = useCallback(async (payload: {
    email: string;
    password: string;
    name: string;
    address: string;
    region: string;
    district: string;
    locality: string;
    postalCode: string;
    phone: string;
    birthDate: string;
    nif: string;
    acceptedPrivacyPolicy: boolean;
  }) => {
    const { token: t } = await customerRegister(payload);
    localStorage.setItem(STORAGE_KEY, t);
    setToken(t);
    const me = await customerMe(t);
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const saveProfile = useCallback(
    async (profile: CustomerProfile) => {
      if (!token) throw new Error("Sessão inválida");
      await updateCustomerProfile(token, profile);
      const me = await customerMe(token);
      setUser(me);
    },
    [token]
  );

  const value: CustomerAuthContextValue = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshUser,
    saveProfile,
  };
  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
