"use client";

import OnboardForm from "@/app/(auth)/onboard/_components/OnboardForm";
import { MinTablet } from "@/components/common/BreakPoints";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useEffect } from "react";

const OnboardContentWrapper = () => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isTabletOrSmaller) {
      window.location.reload();
    }
  }, [isTabletOrSmaller]);

  return (
    <MinTablet>
      <div className="relative inline-block h-fit w-auto rounded-lg bg-bg-01 p-6 shadow-lg">
        <OnboardForm />
      </div>
    </MinTablet>
  );
};

export default OnboardContentWrapper;
