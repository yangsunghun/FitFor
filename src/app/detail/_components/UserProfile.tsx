"use client";

import VerifiedBadge from "@/app/mypage/_components/VerifiedBadge";
import sampleImage from "@/assets/images/image_sample.png";
import Image from "next/image";

type UserProfileProps = {
  profileImage?: string | null;
  nickname: string;
  uploadPlace?: string | null;
  isVerified?: boolean;
};

const UserProfile = ({ profileImage, nickname = "익명", isVerified, uploadPlace }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-4">
      <figure className="relative h-12 w-12 overflow-hidden tb:h-[40px] tb:w-[40px]">
        <Image
          src={profileImage || sampleImage} // 프로필 이미지 또는 기본 이미지 사용
          alt={`${nickname}의 프로필 이미지`}
          width={48}
          height={48}
          className="rounded-full border border-line-03 bg-bg-02 object-cover"
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
