"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

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
    <div className="flex h-[160px] w-[996px] flex-row items-center">
      <Image
        className="rounded-full bg-white"
        src={user.profile_image || "/images/default-user-profile"}
        alt={`${user.nickname} profile image`}
        width={160}
        height={160}
        priority
      />
      <div className="ml-[150px] flex h-full flex-col justify-between">
        <p className="text-2xl">
          <strong>{user!.nickname}</strong>
        </p>
        <p className="text-base flex flex-col">
          <strong> [유저 디테일 들어가는 자리]</strong>
        </p>
        <button className="max-w-40 rounded-2xl bg-black px-4 py-2 text-white">프로필 수정(x)</button>
      </div>
    </div>
  );
};

export default ProfileSection;
