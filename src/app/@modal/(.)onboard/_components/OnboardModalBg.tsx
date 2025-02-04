"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type OnboardModalBgProps = {
  children: ReactNode;
};

const OnboardModalBg = ({ children }: OnboardModalBgProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useLockScroll();

  useEffect(() => {
    if (user?.onboard) {
      router.back();
    }
  }, [user?.onboard, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {children}
    </div>
  );
};

export default OnboardModalBg;
