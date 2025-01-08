"use client";

import { useAuthStore } from "@/lib/store/authStore";

const ProfileSection = () => {
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    console.log("프로필 섹션", user);
    return (
      <div className="mt-5 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">프로필</h2>
      <div className="user-info">
        <p className="text-lg">
          <strong>이름:</strong> {user!.nickname}
        </p>
        <p className="text-lg">
          <strong>이메일:</strong> {user!.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
