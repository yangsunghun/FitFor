"use client";

import { useAuthStore } from "@/lib/store/authStore";
import type { UserType } from "@/lib/types/auth";
import { fetchUser } from "@/lib/utils/auth/auth";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

const AuthContext = createContext<{user: UserType | null}>({user: null});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, setUser } = useAuthStore();
  // 컨밴션 정해서 타입 지정
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 유저의 로그인 여부 파악
  useEffect(() => {
    const fetchSignedUser = async () => {
      try {
        // TODO: 변수에 담자
        const user = await fetchUser()
        // console.log({user})
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchSignedUser();
  }, [isAuthenticated]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
