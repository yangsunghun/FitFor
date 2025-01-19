"use client";

import { EnvelopeSimple } from "@phosphor-icons/react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SocialLoginButton from "./SocialLoginButton";

const LoginOptions = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const showEmailForm = () => {
    setIsEmailLogin((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 mt-6">
      {!isEmailLogin ? (
        <>
          <SocialLoginButton provider="kakao" />
          <SocialLoginButton provider="google" />
          {/* 1차 피드백 이후의 도전 기능 */}
          <button
            className="flex hidden w-full flex-row justify-center gap-4 rounded-2xl bg-white p-4 text-black shadow-md"
            onClick={showEmailForm}
          >
            <EnvelopeSimple size={25} />
            <span>이메일로 시작</span>
          </button>
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
