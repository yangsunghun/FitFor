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
      console.log("여기인가?");
      window.location.reload();
    }
  }, [isTabletOrSmaller, router]);

  return (
    <div className="bg-priamry-50">
      <MinTablet>
        <LoginContent />
      </MinTablet>
    </div>
  );
};

export default LoginContentWrapper;
