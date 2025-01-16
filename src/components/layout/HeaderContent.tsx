"use client";

import { useUser } from "@/lib/hooks/auth/useUser";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import { useAuthStore } from "@/lib/store/authStore";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const HeaderContent = () => {
  useUser();
  const { user } = useAuthStore();
  const { inputValue, setInputValue, handleSearch } = useSearchQuery();

  return (
    <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between">
      <Link href="/" className="flex h-14 w-[8.75rem] items-center justify-center rounded-[.5rem] bg-bg-02">
        FITFOR
      </Link>

      <nav className="w-44">
        <ul className="flex w-full text-title2 font-medium">
          <li className="w-1/2 text-center">
            <Link href="/bookmarks">북마크</Link>
          </li>
          <li className="w-1/2 text-center">
            <a href="">라이브</a>
          </li>
        </ul>
      </nav>
      {/* 검색창 */}
      <div className="max-w-xl flex-1 items-center justify-center">
        <form onSubmit={handleSearch} className="flex w-full flex-row items-center rounded-[1rem] bg-bg-02 pl-6">
          <button type="submit">
            <MagnifyingGlass size={24} className="text-text-03" />
          </button>
          <input
            type="search"
            placeholder="textfield"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-14 w-full bg-transparent pl-2 text-title2 font-medium outline-none placeholder:text-text-03"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <Link href="/mypage">
            <Image
              src={user!.profile_image as string}
              alt={`${user.nickname}'s profile`}
              width={50}
              height={50}
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
