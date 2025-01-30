import sampleImage from "@/assets/images/image_sample.png";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type Props = {
  profileImage: string | null | undefined;
  nickname?: string;
  size: number;
  className?: string;
};

const ProfileImageCircle = ({ profileImage, nickname, size, className }: Props) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  return (
    <Image
      src={isImgError || !profileImage ? sampleImage : profileImage} // 프로필 이미지 또는 기본 이미지 사용
      alt={`${nickname}의 프로필 이미지`}
      width={size}
      height={size}
      className={clsx("overflow-hidden rounded-full border border-line-02 bg-bg-02 object-cover", className)}
      onError={() => setIsImgError(true)}
    />
  );
};

export default ProfileImageCircle;
