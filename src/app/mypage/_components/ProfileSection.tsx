"use client";

import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";
import ProfileSkeleton from "./ProfileSkeleton";
import VerifiedBadge from "./VerifiedBadge";

const ProfileSection = () => {
  const { user } = useAuthStore();

  // user null일때 skeleton 필요함
  return user ? (
    <div className="mb-20 mt-10 flex h-40 w-[40.5rem] flex-row items-center">
      <div className="over-flow-hidden relative h-40 w-40">
        <Image
          className="bg-transparant rounded-full object-cover"
          src={user?.profile_image || "/images/default-user-profile"}
          alt={`${user?.nickname} profile image`}
          fill
          priority
        />
        <VerifiedBadge isVerified={user?.is_verified || false} />
      </div>
      <div className="relative ml-20 flex h-full w-full max-w-96 flex-col">
        <p className="mb-2 text-title1 font-bold">{user?.nickname || "User"}</p>
        <p className="flex flex-col text-body">{user?.introduction || "아직 한 줄 소개가 없습니다."}</p>

        <Button asChild variant="secondary" size="sm" className="absolute bottom-0 left-0">
          <Link href="/mypage/profile-setting">프로필 편집</Link>
        </Button>
      </div>
    </div>
  ) : (
    <ProfileSkeleton />
  );
};

export default ProfileSection;
