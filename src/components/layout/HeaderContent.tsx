"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { CaretDown } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import HeaderCategorys from "./HeaderCategorys";
import SearchBar from "./SearchBar";

const HeaderContent = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="relative z-10 w-full bg-white px-6 py-3">
        <div className="relative mx-auto flex max-w-[1200px] items-center gap-[4vw]">
          <Link href="/" className="flex h-12 w-[8.75rem] items-center justify-center rounded-[.5rem] bg-bg-02">
            FITFOR
          </Link>

          <nav className="flex w-[22%] max-w-[16.5rem] justify-between text-title2 font-bold">
            <Link href="/bookmarks" className="text-center">
              북마크
            </Link>
            <Link href="/chat" className="text-center">
              라이브
            </Link>
            <button className="flex items-center gap-2" onClick={toggleOpen}>
              카테고리
              <CaretDown
                size={20}
                className={clsx({
                  "rotate-180": isOpen,
                  "rotate-0": !isOpen
                })}
              />
            </button>
          </nav>
          {/* 검색창 */}
          <SearchBar />

          <div className="absolute right-0">
            {user ? (
              <Button asChild variant="disabledLine" className="text-body font-medium flex flex-row infline-flex gap-2 py-3 leading-[1.5rem]">
                <Link href="/mypage">
                  <Image
                    src={user.profile_image as string}
                    alt={`${user.nickname}'s profile`}
                    width={24}
                    height={24}
                    priority
                    className="rounded-full"
                  />
                  <span className="text-text-04">{user.nickname}</span>
                </Link>
              </Button>
            ) : (
              <Button asChild variant="whiteLine" size="md">
                <Link href="/login">로그인/회원가입</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "absolute left-0 top-full z-10 w-full overflow-hidden bg-bg-01 shadow-sm transition-all duration-300 ease-in-out",
          {
            "max-h-[600px]": isOpen,
            "max-h-0": !isOpen
          }
        )}
      >
        <HeaderCategorys handleClose={handleClose} />
      </div>
      {isOpen && (
        <div
          className={clsx(
            "z-1 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 backdrop-blur-sm transition duration-300",
            {
              "opacity-100": isOpen,
              "opacity-0": !isOpen
            }
          )}
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default HeaderContent;
