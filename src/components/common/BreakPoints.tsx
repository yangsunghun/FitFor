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

export const MinDesktop = ({ children }: Props) => {
  const isDesktopOrLarger = useMediaQuery("(min-width: 1200px)");
  return isDesktopOrLarger ? children : null;
};

export const MinTablet = ({ children }: Props) => {
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");
  return isTabletOrLarger ? children : null;
};

export const MinMobile = ({ children }: Props) => {
  const isMobileOrLarger = useMediaQuery("(min-width: 480px)");
  return isMobileOrLarger ? children : null;
};

export const MinDefault = ({ children }: Props) => {
  const isMiniOrLarger = useMediaQuery("(min-width: 375px)");
  return isMiniOrLarger ? children : null;
};
