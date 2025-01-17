"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";
import VerifiedBadge from "./VerifiedBadge";

const ProfileSection = () => {
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    return (
      <div className="mt-5 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="my-20 flex h-40 w-[40.5rem] flex-row items-center">
      <div className="over-flow-hidden relative h-40 w-40">
        {/* 프로필 이미지 */}
        <Image
          className="bg-transparant rounded-full object-cover"
          src={user.profile_image || "/images/default-user-profile"}
          alt={`${user.nickname} profile image`}
          fill
          priority
        />
        {/* 인증 배지 */}
        <VerifiedBadge isVerified={user.is_verified} />
      </div>

      {/* 유저 정보 설명 */}
      <div className="ml-[150px] flex h-full max-w-96 flex-col justify-between">
        <p className="text-title1 font-bold">{user!.nickname}</p>
        <p className="flex flex-col text-body">{user!.introduction || "아직 한 줄 소개가 없습니다."}</p>
        <Link
          href="/mypage/profile-setting"
          className="max-w-[100px] rounded-2xl bg-black px-3 py-2 text-center text-body text-white"
        >
          프로필 편집
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
