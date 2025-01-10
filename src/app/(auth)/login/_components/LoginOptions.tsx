"use client";

import Image from "next/image";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SocialLoginButton from "./SocialLoginButton";

const LoginOptions = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const showEmailForm = () => {
    setIsEmailLogin((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {!isEmailLogin ? (
        <>
          <button
            className="flex w-full flex-row justify-center gap-4 rounded-2xl bg-white p-4 text-black"
            onClick={showEmailForm}
          >
            <Image src="/images/default-user-profile.png" width={24} height={24} alt="FitFor login" />
            <span>이메일로 시작하기</span>
          </button>
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="kakao" />
        </>
      ) : (
        <>
          <LoginForm />
          <button onClick={showEmailForm}>뒤로가기</button>
        </>
      )}
    </div>
  );
};

export default LoginOptions;
