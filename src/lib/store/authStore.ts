import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/auth";

// 유저 로그인 여부 및 정보 스토어
type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set(() => ({ user }))
    }),
    { name: "auth-store" }
  )
);
