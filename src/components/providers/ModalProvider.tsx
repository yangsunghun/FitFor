"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  return <div className={!isVisible ? "hidden" : ""}>{children}</div>;
}
