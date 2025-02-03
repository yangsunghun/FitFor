"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MinTablet } from "../common/BreakPoints";

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (pathname.includes("/detail")) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathname]);

  return (
    <div className={!isVisible ? "hidden" : ""}>
      <MinTablet>{children}</MinTablet>
    </div>
  );
}
