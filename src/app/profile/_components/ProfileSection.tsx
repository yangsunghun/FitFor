"use client";

import ProfileSkeleton from "@/app/mypage/_components/ProfileSkeleton";
import VerifiedBadge from "@/app/mypage/_components/VerifiedBadge";
import { useUserProfile } from "@/lib/hooks/profile/useUserProfile";
import { PencilSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userId: string;
};

const ProfileSection = ({ userId }: Props) => {
  const { userData } = useUserProfile(userId);

  return userData ? (
    <div className="mx-auto my-20 flex h-40 w-[40.5rem] flex-row items-center gap-20 tb:my-10 tb:h-auto tb:w-[21.438rem] tb:flex-col tb:gap-4 mb:w-[19rem]">
      {/* 프로필 이미지와 인증 배지 */}
      <div className="over-flow-hidden relative flex h-40 w-40 tb:max-h-20 tb:max-w-20">
        <Image
          className="bg-transparant h-full w-full rounded-full border border-gray-100 object-cover"
          src={userData?.profile_image || "/images/default-user-profile"}
          alt={`${userData?.nickname} profile image`}
          fill
          priority
        />
        <VerifiedBadge isVerified={userData?.is_verified || false} />
      </div>
      {/* 이름 & 한 줄 소개 */}
      <div className="relative flex h-full w-full max-w-96 flex-col gap-2 tb:ml-0 tb:h-[4.688rem] tb:w-full tb:items-center mb:w-[19rem]">
        <div className="flex flex-row items-center gap-1">
          <p className="mb-2 text-title1 font-bold tb:m-0 tb:text-title2">{userData?.nickname || "User"}</p>
          <Link href="/mypage/profile-setting" className="hidden text-text-03 tb:inline">
            <PencilSimple />
          </Link>
        </div>
        <p className="tb:max-w=[7.875rem] flex flex-col text-body text-text-03 tb:break-keep tb:text-center tb:text-caption tb:font-medium">
          {userData?.introduction || "아직 한 줄 소개가 없습니다."}
        </p>
      </div>
    </div>
  ) : (
    <ProfileSkeleton />
  );
};

export default ProfileSection;
