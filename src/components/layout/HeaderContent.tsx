"use client";

import { useUser } from "@/lib/hooks/auth/useUser";
import { useAuthStore } from "@/lib/store/authStore";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const HeaderContent = () => {
  useUser();
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex h-12 w-32 items-center justify-center rounded-2xl border-2 border-black">
          <Link href="/" className="font-bold">
            FITFOR
          </Link>
        </div>

        {/* 라이브 버튼 */}
        <div className="h-[50px] w-[50px] rounded-full bg-black text-white" />
      </div>

      {/* 검색창 */}
      <div className="max-w-xl flex-1 items-center justify-center">
        <div className="flex w-full max-w-lg flex-row items-center gap-4 rounded-xl bg-gray-300 pr-4">
          <input
            type="search"
            placeholder="검색"
            className="h-12 w-full rounded-l-2xl bg-transparent pl-4 text-black placeholder:text-black focus-visible:outline-gray-400"
          />
          <button>
            <MagnifyingGlass size={30} className="text-black" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-[50px] w-[50px] rounded-full bg-black text-white" />
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
          <Link href="/login">로그인</Link>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;
