"use client";
import Image from "next/image";


const LoginButton = () => {
  return (
    // TODO: 버튼 스타일링 테마색 정해지는대로 변경
    // TODO: 버튼 로고도 정해지는 대로 변경
    <button
      className="flex flex-row gap-4 rounded-2xl p-4 w-2/4 justify-center bg-white text-black"
    >
      <Image
        src="/images/default-user-profile.png"
        width={24}
        height={24}
        alt="FitFor login"
      />
      <span>이메일로 시작하기</span>
    </button>
  );
};

export default LoginButton;
