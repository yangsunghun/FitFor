import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserType } from "../types/auth";

// 유저 로그인 여부 및 정보 스토어
type AuthState = {
  user: UserType | null;
  isLoggedIn: boolean;
  setUser: (user: AuthState["user"]) => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set(() => ({ user, isLoggedIn: true }))
    }),
    { name: "auth-store" }
  )
);
