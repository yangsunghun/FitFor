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
            className="mt-8 flex w-full flex-row justify-center gap-4 rounded-2xl bg-white p-4 text-black shadow-md"
            onClick={showEmailForm}
          >
            <Image src="/images/default-user-profile.png" width={25} height={25} alt="FitFor login" priority />
            <span>이메일로 시작</span>
          </button>
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="kakao" />
        </>
      ) : (
        <>
          <button onClick={showEmailForm} className="self-start text-gray-500 hover:text-black">
            {"<- "}뒤로가기
          </button>
          <LoginForm />
        </>
      )}
    </div>
  );
};

export default LoginOptions;
