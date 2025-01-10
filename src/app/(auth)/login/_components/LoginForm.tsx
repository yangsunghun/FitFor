"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/utils/auth/auth";
import Link from "next/link";

const LoginForm = () => {
  console.log("render");
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
    <>
      <form className="flex w-full flex-col" autoComplete="off" onSubmit={handleLogin}>
        {/* TODO: input design */}
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="이메일"
          className="border-input placeholder:text-muted-foreground my-4 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="비밀번호"
          className="border-input placeholder:text-muted-foreground mb-4 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        {/* TODO: 버튼 디자인 */}
        <button type="submit" className="flex w-full flex-row justify-center gap-4 rounded-2xl bg-white p-4 text-black">
          로그인
        </button>
      </form>
      <p>
        계정이 없으신가요?{` `}
        <Link href="/signup" className="text-blue-900">
          회원가입
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
