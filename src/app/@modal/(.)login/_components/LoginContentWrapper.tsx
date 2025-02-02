"use client";

import LoginContent from "@/app/(auth)/login/_components/LoginContent";
import { MinTablet } from "@/components/common/BreakPoints";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginContentWrapper = () => {
  const router = useRouter();
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isTabletOrSmaller) {
      window.location.reload();
    }
  }, [isTabletOrSmaller, router]);

  return (
    <MinTablet>
      <LoginContent />
    </MinTablet>
  );
};

export default LoginContentWrapper;
