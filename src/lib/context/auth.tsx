"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial default user for quick demo access
const DEFAULT_DEMO_USER = {
  id: "demo-admin-id",
  name: "Graveyard Admin",
  email: "admin@graveyard.com",
  password: "admin123", // Stored simply for mock validation
  role: "VC Investor",
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load active session and initialize mock database on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Initialize users database if not present
        const existingUsers = localStorage.getItem("sg_users");
        if (!existingUsers) {
          localStorage.setItem(
            "sg_users",
            JSON.stringify([
              {
                id: DEFAULT_DEMO_USER.id,
                name: DEFAULT_DEMO_USER.name,
                email: DEFAULT_DEMO_USER.email,
                password: DEFAULT_DEMO_USER.password,
                role: DEFAULT_DEMO_USER.role,
                createdAt: DEFAULT_DEMO_USER.createdAt,
              },
            ])
          );
        }

        // Check for active session
        const session = localStorage.getItem("sg_session");
        if (session) {
          setUser(JSON.parse(session));
        }
      }
    } catch (e) {
      console.error("Failed to read auth state from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Add artificial delay for realistic UX/shimmer animations
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const usersStr = localStorage.getItem("sg_users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      
      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        setIsLoading(false);
        return { success: false, error: "Invalid email or password" };
      }

      // Safe user payload (exclude password)
      const userPayload: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        createdAt: foundUser.createdAt,
      };

      localStorage.setItem("sg_session", JSON.stringify(userPayload));
      setUser(userPayload);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: "Authentication system error" };
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const usersStr = localStorage.getItem("sg_users") || "[]";
      const users = JSON.parse(usersStr);

      const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setIsLoading(false);
        return { success: false, error: "An account with this email already exists" };
      }

      const newUser = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name,
        email: email.toLowerCase(),
        password,
        role,
        createdAt: new Date().toISOString(),
      };

      // Store in users DB
      users.push(newUser);
      localStorage.setItem("sg_users", JSON.stringify(users));

      // Log the user in directly
      const userPayload: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      };

      localStorage.setItem("sg_session", JSON.stringify(userPayload));
      setUser(userPayload);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: "Registration system error" };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("sg_session");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
