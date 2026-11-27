"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface AppUser {
  id: string;
  username: string;
  name: string;
  role: string;
  dailySugarLimit: number;
  avatarColor: string;
}

interface AppContextType {
  user: AppUser | null;
  familyAccounts: AppUser[];
  loading: boolean;
  refreshSession: () => Promise<void>;
  switchAccount: (targetUserId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AppUser | null>(null);
  const [familyAccounts, setFamilyAccounts] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setFamilyAccounts(data.familyAccounts || []);
      } else {
        setUser(null);
        setFamilyAccounts([]);
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const switchAccount = async (targetUserId: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quickSwitchUserId: targetUserId }),
    });
    if (res.ok) {
      await refreshSession();
      router.push("/dashboard");
      router.refresh();
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  return (
    <AppContext.Provider
      value={{ user, familyAccounts, loading, refreshSession, switchAccount, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
