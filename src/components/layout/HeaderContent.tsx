"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { fetchUser } from "@/lib/utils/auth/auth";
import { useEffect } from "react";

const HeaderContent = () => {
  // 로그인된 유저가 있다면
  // store에 유저를 저장하는 로직입니다.
  // 헤더 부분에서 필요
  const { setUser } = useAuthStore();
  useEffect(() => {
    const fetchPublicUserData = async () => {
      const user = await fetchUser();
      // zustand에 저장
      if (user) {
        setUser(user);
      }
    };

    fetchPublicUserData();
  }, [setUser]);

  return <p>HeaderContext</p>;
};

export default HeaderContent;
