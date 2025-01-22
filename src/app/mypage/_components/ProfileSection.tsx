"use client";

import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { PencilSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import ProfileSkeleton from "./ProfileSkeleton";
import VerifiedBadge from "./VerifiedBadge";

const ProfileSection = () => {
  const { user } = useAuthStore();

  return user ? (
    <div className="mx-auto my-20 flex h-40 w-[40.5rem] flex-row items-center gap-20 tb:my-10 tb:h-auto  mb:w-[19rem] tb:w-[21.438rem] tb:flex-col tb:gap-4">
      {/* 프로필 이미지와 인증 배지 */}
      <div className="over-flow-hidden relative flex h-40 w-40 tb:max-h-20 tb:max-w-20">
        <Image
          className="bg-transparant h-full w-full rounded-full border border-gray-100 object-cover"
          src={user?.profile_image || "/images/default-user-profile"}
          alt={`${user?.nickname} profile image`}
          fill
          priority
        />
        <VerifiedBadge isVerified={user?.is_verified || false} />
      </div>
      {/* 이름 & 한 줄 소개 */}
      <div className="relative flex h-full w-full max-w-96 flex-col gap-2 tb:ml-0 tb:h-[4.688rem] mb:w-[19rem] tb:w-full tb:items-center">
        <div className="flex flex-row items-center gap-1">
          <p className="mb-2 text-title1 font-bold tb:m-0 tb:text-title2">{user?.nickname || "User"}</p>
          <Link href="/mypage/profile-setting">
            <PencilSimple className="text-text-03 hidden tb:inline" />
          </Link>
        </div>
        <p className="tb:max-w=[7.875rem] flex flex-col text-body text-text-03 tb:break-keep tb:text-center tb:text-caption tb:font-medium">
          {user?.introduction || "아직 한 줄 소개가 없습니다."}
        </p>

        <Button asChild variant="secondary" size="sm" className="absolute bottom-0 left-0 tb:hidden">
          <Link href="/mypage/profile-setting">프로필 편집</Link>
        </Button>
      </div>
    </div>
  ) : (
    <ProfileSkeleton />
  );
};

export default ProfileSection;
