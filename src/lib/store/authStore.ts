import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tables } from "../types/supabase";

// 유저 로그인 여부 및 정보 스토어
type AuthState = {
  user: Tables<"users"> | null;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null
    }),
    { name: "auth-store" }
  )
);
