"use client"
import { useAuthStore } from "@/lib/store/authStore";

const page = () => {
  const {user} = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white p-6">
      <h1 className="text-title mb-8 font-bold">프로필 수정</h1>

      {/* 이미지 설정 섹션 */}
      <div className="relative mb-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-300">
          <span className="text-4xl font-bold text-gray-500">+</span>
        </div>
        <div className="hidden absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <span className="text-sm font-bold text-white">+</span>
        </div>
      </div>

      {/* 인풋 */}
      <div className="w-full max-w-md space-y-6">
        {/* 닉네임 부분 */}
        <div>
          <label htmlFor="nickname" className="text-sm block font-medium text-gray-700">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="Placeholder"
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-black focus:ring-black"
            autoComplete="off"
          />
        </div>

        {/* 한줄 소개 */}
        <div>
          <label htmlFor="oneLineIntro" className="text-sm block font-medium text-gray-700">
            한 줄 소개
          </label>
          <input
            id="oneLineIntro"
            type="text"
            placeholder="Placeholder"
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-black focus:ring-black"
          />
        </div>
      </div>

      {/* Gender Selection */}
      <div className="mt-6 w-full max-w-md">
        <label className="text-sm mb-2 block font-medium text-gray-700">성별</label>
        <div className="flex justify-between">
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="male" className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center peer-checked:bg-black peer-checked:text-white accent-white" />
            <span>남성</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="female" className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center peer-checked:bg-black peer-checked:text-white accent-white" />
            <span>여성</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="none" className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center peer-checked:bg-black peer-checked:text-white accent-white" />
            <span>선택하지 않음</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button className="mt-8 w-full max-w-md rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800">
        수정 완료
      </button>
    </div>
  );
};

export default page;
