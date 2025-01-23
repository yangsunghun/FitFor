"use client";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

type Props = {
  children: React.ReactNode;
};

export const Desktop = ({ children }: Props) => {
  const isDesktopOrSmaller = useMediaQuery("(max-width: 1200px)");
  return isDesktopOrSmaller ? children : null;
};
export const Tablet = ({ children }: Props) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  return isTabletOrSmaller ? children : null;
};
export const Mobile = ({ children }: Props) => {
  const isMobileOrSmaller = useMediaQuery("(max-width: 480px)");
  return isMobileOrSmaller ? children : null;
};
export const Default = ({ children }: Props) => {
  const isMiniOrSmaller = useMediaQuery("(max-width: 375px)");
  return isMiniOrSmaller ? children : null;
};
