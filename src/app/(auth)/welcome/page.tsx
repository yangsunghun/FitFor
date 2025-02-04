"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const { hideNavBar, showNavBar } = useNavBarStore();
  const { user } = useAuthStore();

  useEffect(() => {
    hideNavBar();
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/home");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      showNavBar();
    };
  }, [router, user, hideNavBar, showNavBar]);

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-title2 font-medium text-text-03">환영합니다 {user?.nickname}님!</p>
        <h1 className="mt-2 text-title1 font-bold">가입이 완료되었어요</h1>
        <p className="mt-4 text-caption text-gray-500">{countdown}초 후 홈으로 이동합니다...</p>
      </div>
    </main>
  );
};

export default WelcomePage;
