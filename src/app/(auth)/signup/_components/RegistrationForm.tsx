"use client";
import { signup } from "@/lib/utils/auth/auth";
import Link from "next/link";
import AuthInput from "../../_components/AuthInput";

const RegistrationForm = () => {
  // handler 작성
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await signup(formData);

    // 회원가입과 동시에 바로 로그인 되는 로직이 필요

    window.location.href = "/login";
  };

  return (
    <>
      <form className="mt-8 flex w-full flex-col" autoComplete="off" onSubmit={handleSignup}>
        {/* <AuthInput type="text" placeholder="닉네임" />
        <AuthInput type="email" placeholder="이메일" />
        <AuthInput type="password" placeholder="비밀번호" />
        <AuthInput type="password" placeholder="비밀번호 확인" /> */}
        <button type="submit" className="flex w-full flex-row justify-center gap-4 rounded-2xl p-4 border">
          회원가입
        </button>
      </form>
      <p className="my-2">
        계정이 있으신가요?{` `}
        <Link href="/login" className="text-blue-900">
          로그인
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
