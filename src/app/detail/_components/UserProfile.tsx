"use client";

import VerifiedBadge from "@/app/mypage/_components/VerifiedBadge";
import ProfileImageCircle from "@/components/shared/ProfileImageCircle";

type UserProfileProps = {
  profileImage?: string | null;
  nickname: string;
  uploadPlace?: string | null;
  isVerified?: boolean;
};

const UserProfile = ({ profileImage, nickname = "익명", isVerified, uploadPlace }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-4">
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
