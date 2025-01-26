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
    console.log("loginContentWrapper useEffect 실행됨");
    if (isTabletOrSmaller) {
      console.log("태블릿보다 작음");
      window.location.reload();
    }
  }, [isTabletOrSmaller, router]);

  return (
    <div>
      <MinTablet>
        <LoginContent />
      </MinTablet>
    </div>
  );
};

export default LoginContentWrapper;
