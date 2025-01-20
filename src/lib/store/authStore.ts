import { UserType } from "@/lib/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 유저 로그인 여부 및 정보 스토어
type AuthState = {
  user: UserType | null;
  isLoggedIn: boolean;
  setUser: (user: AuthState["user"]) => void;
  deleteUser: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      deleteUser: async () => {
        try {
          const response = await fetch("/api/auth/delete", {
            method: "DELETE"
          });

          if (!response.ok) {
            throw new Error("회원 탈퇴 실패");
          }
          window.location.href = "/home"; // 탈퇴 후 홈으로
          set({ user: null, isLoggedIn: false });
          document.cookie = "supabase.auth.token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;"; // 쿠키 삭제
        } catch (error: any) {
          console.error("회원 탈퇴 오류", error.message);
        }
      }
    }),
    { name: "auth-store" }
  )
);
