"use client";

import { login } from "@/lib/utils/auth/auth";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className="h-screen w-full justify-items-center bg-gray-400 p-8">
      <form className="flex w-2/4 flex-col" autoComplete="off">
        <label htmlFor="email">이메일:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">비밀번호:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>로그인</button>
      </form>
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
