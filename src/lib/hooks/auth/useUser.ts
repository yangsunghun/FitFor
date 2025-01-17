"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { fetchUser } from "@/lib/utils/auth/auth";
import { useEffect } from "react";

export const useUser = () => {
  // 로그인된 유저가 있다면
  // 현재 유저를 store에 유저를 저장하는 로직
  const { isLoggedIn, setUser } = useAuthStore();
  useEffect(() => {
    const fetchPublicUserData = async () => {
      if (!isLoggedIn) {
        const user = await fetchUser();

        // zustand에 저장
        if (user) {
          setUser(user);
        }
      }
    };

    fetchPublicUserData();
  }, [isLoggedIn, setUser]);
};
