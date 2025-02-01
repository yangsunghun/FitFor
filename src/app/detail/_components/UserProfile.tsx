"use client";

import VerifiedBadge from "@/app/mypage/_components/VerifiedBadge";
import ProfileImageCircle from "@/components/shared/ProfileImageCircle";
import Link from "next/link";

type UserProfileProps = {
  profileImage?: string | null;
  nickname: string;
  uploadPlace?: string | null;
  isVerified?: boolean;
  userId: string;
};

const UserProfile = ({ profileImage, nickname = "익명", isVerified, uploadPlace, userId }: UserProfileProps) => {
  return (
    <div className="relative flex w-fit items-center gap-4">
      <Link href={`/profile/${userId}`} className="click-box z-10"></Link>
      <figure className="relative">
        <ProfileImageCircle
          profileImage={profileImage}
          nickname={nickname}
          size={48}
          className="h-12 w-12 tb:h-[40px] tb:w-[40px]"
        />
        <VerifiedBadge isVerified={isVerified || false} />
      </figure>
      <div>
        <p className="text-title2 font-bold tb:text-body tb:font-medium">{nickname}</p>
        <p className="text-text-03 tb:text-caption">{uploadPlace}</p>
      </div>
    </div>
  );
};

export default UserProfile;
