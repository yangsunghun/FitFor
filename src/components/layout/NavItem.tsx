"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type NavItemProps = {
  href: string;
  icon: ReactNode;
  label: string;
};

const NavItem = ({ href, icon, label }: NavItemProps) => {
  const pathname = usePathname(); // 현재 경로
  const searchParams = useSearchParams(); // 현재 쿼리 파라미터

  const currentUrl = `${pathname}?${searchParams.toString()}`; // 경로 + 쿼리
  const isActive = currentUrl.includes(href); // href가 현재 URL에 포함되어 있는지 확인
  return (
    <li className="relative flex-1">
      <Link
        href={href}
        className={clsx(
          "flex flex-col items-center py-[4px] text-center transition-colors",
          isActive ? "font-bold text-primary-default" : "text-text-02"
        )}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
