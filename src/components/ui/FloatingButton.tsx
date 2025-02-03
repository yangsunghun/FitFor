"use client";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { Plus, X } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
  text?: string;
};

const FloatingButton = ({ href, icon, text = "새 글 작성하기" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const Icon = isOpen ? X : Plus; // isOpen 상태에 따라 사용할 컴포넌트 선택
  const size = isTabletOrSmaller ? 24 : 48; // 디바이스 크기에 따라 아이콘 크기 설정
  return (
    <div className="fixed bottom-12 right-[6.875rem] z-50 h-fit w-fit transition duration-300 tb:bottom-[80px] tb:right-[24px]">
      <button
        onClick={toggleOpen}
        className={clsx(
          "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full !text-text-01 transition duration-300 tb:h-[40px] tb:w-[40px]",
          { "bg-primary-default": !isOpen, "bg-secondary-light": isOpen }
        )}
      >
        <Icon size={size} weight="bold" />
      </button>
      <ul
        className={clsx(
          "shadow-emphasize absolute bottom-[calc(100%+10px)] right-0 rounded-lg bg-bg-01 px-3 transition duration-300",
          {
            "pointer-events-auto animate-slideIn opacity-100": isOpen,
            "pointer-events-none animate-slideOut opacity-0": !isOpen
          }
        )}
      >
        <li className="w-full whitespace-nowrap py-2 text-left font-medium tb:font-normal">
          <Link href={href || "#"}>
            {icon}
            {text}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FloatingButton;
