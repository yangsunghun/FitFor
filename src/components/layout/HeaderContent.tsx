"use client";

import { useUser } from "@/lib/hooks/auth/useUser";
import { useAuthStore } from "@/lib/store/authStore";
import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import SearchBar from "./SearchBar";

const HeaderContent = () => {
  useUser();
  const { user } = useAuthStore();

  return (
    <div className="container relative mx-auto flex max-w-[1200px] items-center gap-[4vw]">
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
        <Link href="/search" className="flex items-center gap-2">
          카테고리
          <CaretDown size={20} />
        </Link>
      </nav>
      {/* 검색창 */}
      <SearchBar />

      <div className="absolute right-0">
        {user ? (
          <Link href="/mypage">
            <Image
              src={user!.profile_image as string}
              alt={`${user.nickname}'s profile`}
              width={48}
              height={48}
              priority
              className="rounded-full"
            />
          </Link>
        ) : (
          <Button asChild variant="whiteLine" size="md">
            <Link href="/login">로그인/회원가입</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;
