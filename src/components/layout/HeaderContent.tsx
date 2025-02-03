"use client";

import LogoImage from "@/assets/images/LogoImage";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useAuthStore } from "@/lib/store/authStore";
import { useHeaderStore } from "@/lib/store/useHeaderStore";
import { CaretDown } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProfileImageCircle from "../shared/ProfileImageCircle";
import { Button } from "../ui/Button";
import HeaderCategorys from "./HeaderCategorys";
import SearchBar from "./SearchBar";

const HeaderContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const { isVisible } = useHeaderStore();
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
    setIsLoading(false);
  }, [pathname]);

  if (!isVisible || isTabletOrSmaller) return null;

  return (
    <>
      <div className="relative z-10 w-full bg-white px-6 py-4">
        <div className="relative mx-auto flex max-w-[1200px] items-center gap-[4vw]">
          <Link href="/">
            <h1 className="tb:w-[80px]">
              <LogoImage />
            </h1>
          </Link>

          <nav className="flex w-[22%] min-w-[190px] max-w-[16.5rem] justify-between text-title2 font-medium text-text-03">
            {!user ? (
              <button
                onClick={() => {
                  alert("로그인이 필요합니다");
                  router.push("login");
                }}
              >
                북마크
              </button>
            ) : (
              <Link href="/bookmark" className="text-center">
                북마크
              </Link>
            )}
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
            <Button
              asChild
              variant="whiteLine"
              size="md"
              className="infline-flex flex flex-row gap-2 py-3 text-body font-medium leading-[1.5rem]"
            >
              {isLoading ? (
                <div>
                  <div className="h-full w-[96px] animate-pulse rounded bg-gray-200" />
                </div>
              ) : user?.onboard ? (
                <Link href="/mypage" className="relative">
                  <ProfileImageCircle
                    profileImage={user.profile_image}
                    nickname={user.nickname}
                    size={24}
                    className="h-6 w-6"
                  />
                  <span>{user.nickname}</span>
                </Link>
              ) : (
                <Link href="/login">로그인/회원가입</Link>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "absolute left-0 top-full z-10 w-full overflow-hidden bg-bg-01 shadow-sm transition-all duration-300 ease-in-out",
          { "pointer-events-auto visible": isOpen, "pointer-events-none invisible": !isOpen }
        )}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : 0 }}
      >
        <div ref={contentRef} className="mx-auto flex max-w-[1200px] pb-8 pt-4">
          <HeaderCategorys setIsOpen={setIsOpen} />
        </div>
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
