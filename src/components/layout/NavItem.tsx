"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItemProps = {
  href: string;
  icon: ReactNode;
  label: string;
};

const NavItem = ({ href, icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

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
