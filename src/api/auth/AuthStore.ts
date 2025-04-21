"use client";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SetUser = Omit<User, "password">;

export interface AuthState {
  user: SetUser | null;
  setAuth: (user: SetUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: () => {
        set({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
