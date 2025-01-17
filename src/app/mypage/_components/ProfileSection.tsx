"use client";

import { Button } from "@/components/ui/Button";
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
    <div className="mb-20 mt-10 flex h-40 w-[40.5rem] flex-row items-center">
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
      <div className="ml-20 flex flex-col h-full w-full max-w-96 relative">
        <p className="text-title1 font-bold mb-2">{user!.nickname}</p>
        <p className="flex flex-col text-body">{user!.introduction || "아직 한 줄 소개가 없습니다."}</p>

        <Button asChild variant="secondary" size="sm" className="absolute bottom-0 left-0">
          <Link href="/mypage/profile-setting">프로필 편집</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
