"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex h-40 w-[40.5rem] flex-row items-center my-20">
      <Image
        className="rounded-full bg-white object-cover"
        src={user.profile_image || "/images/default-user-profile"}
        alt={`${user.nickname} profile image`}
        width={160}
        height={160}
        priority
      />
      <div className="ml-[150px] flex h-full flex-col justify-between max-w-96">
        <p className="text-title1 font-bold">
          {user!.nickname}
        </p>
        <p className="text-body flex flex-col">
          {user!.introduction || "아직 한 줄 소개가 없습니다."}
        </p>
        <Link href="/mypage/profile-setting" className="max-w-[100px] rounded-2xl bg-black px-3  py-2 text-center text-white text-body">
          프로필 편집
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
