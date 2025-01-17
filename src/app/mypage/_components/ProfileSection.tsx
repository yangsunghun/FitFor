"use client";

import { Button } from "@/components/ui/Button";
import { useUserProfile } from "@/lib/hooks/mypage/useUserProfile";
import Image from "next/image";
import Link from "next/link";
import VerifiedBadge from "./VerifiedBadge";

const ProfileSection = () => {
  const { user, isPending, isError } = useUserProfile();

  // 스켈레톤으로 대체 필요
  if (isPending) {
    return (
      <div className="mt-5 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    <div className="mt-5 text-center">
      <p className="text-gray-500">오류 발생</p>
    </div>;
  }

  console.log(user)

  return (
    <div className="mb-20 mt-10 flex h-40 w-[40.5rem] flex-row items-center">
      {!isPending && (
        <>
          <div className="over-flow-hidden relative h-40 w-40">
            <Image
              className="bg-transparant rounded-full object-cover"
              src={user!.profile_image || "/images/default-user-profile"}
              alt={`${user!.nickname} profile image`}
              fill
              priority
            />
            <VerifiedBadge isVerified={user!.is_verified} />
          </div>
          <div className="relative ml-20 flex h-full w-full max-w-96 flex-col">
            <p className="mb-2 text-title1 font-bold">{user!.nickname}</p>
            <p className="flex flex-col text-body">{user!.introduction || "아직 한 줄 소개가 없습니다."}</p>

            <Button asChild variant="secondary" size="sm" className="absolute bottom-0 left-0">
              <Link href="/mypage/profile-setting">프로필 편집</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
