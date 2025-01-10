"use client"
import { signup } from "@/lib/utils/auth/auth";
import Link from "next/link";

const RegistrationForm = () => {
  // handler 작성
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await signup(formData)

    // 회원가입과 동시에 바로 로그인 되는 로직이 필요

    window.location.href = "/login"
  }

  return (
    <>
      <form className="flex w-full flex-col" autoComplete="off" onSubmit={handleSignup}>
        <label htmlFor="nickname">닉네임:</label>
        <input id="nickname" name="nickname" type="text" required />
        <label htmlFor="email">이메일:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">비밀번호:</label>
        <input id="password" name="password" type="password" required />
        <label htmlFor="password-confirm">비밀번호 확인:</label>
        <input id="password-confirm" name="password-confirm" type="password" required />
        <button type="submit">회원가입</button>
      </form>
      <p>
        계정이 있으신가요?{` `}
        <Link href="/login" className="text-blue-900">
          로그인
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
