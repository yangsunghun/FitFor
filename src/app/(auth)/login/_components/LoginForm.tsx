"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/utils/auth/auth";
import Link from "next/link";
import SocialLoginButton from "./SocialLoginButton";

const LoginForm = () => {
  // handler 작성
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userInfo = await login(formData);

    // zustand에 저장
    if (userInfo) {
      useAuthStore.getState().setUser(userInfo);
      // home으로 push
      window.location.href = "/";
    } else {
      alert("로그인 정보가 잘못 되었습니다.");
    }
  };
  return (
    <div className="h-screen w-full justify-items-center bg-gray-400 p-8">
      <form className="flex w-2/4 flex-col" autoComplete="off" onSubmit={handleLogin}>
        <label htmlFor="email">이메일:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">비밀번호:</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">로그인</button>
      </form>
      {/* 예시 */}
      <div className="flex w-full flex-col items-center">
        <SocialLoginButton provider="google" />
        {/* <SocialLoginButton provider="kakao" /> */}
      </div>
      <p>
        계정이 없으신가요?{` `}
        <Link href="/signup" className="text-blue-900">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
