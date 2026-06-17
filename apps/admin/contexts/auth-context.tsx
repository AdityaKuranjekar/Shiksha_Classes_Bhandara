"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction, logoutAction } from "@/lib/server-actions/auth.actions";
import { tokenStore } from "@/lib/token-store";

interface Admin {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  login: (formData: FormData) => Promise<{ success: boolean; error?: string; fields?: Record<string, string> }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for persisted session metadata (not token, just user info)
    const stored = sessionStorage.getItem("shiksha_admin");
    if (stored) {
      try {
        setAdmin(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem("shiksha_admin");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (formData: FormData) => {
    setIsLoading(true);
    
    const result = await loginAction(formData);

    if (result.success && result.data) {
      const adminData: Admin = result.data;
      setAdmin(adminData);
      sessionStorage.setItem("shiksha_admin", JSON.stringify(adminData));
      // In real implementation, the API returns the token directly
      tokenStore.set("mock-token-from-login");
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: result.error, fields: result.fields };
  };

  const logout = async () => {
    await logoutAction(); // Clears cookie
    setAdmin(null);
    sessionStorage.removeItem("shiksha_admin");
    tokenStore.clear();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
