"use client";

import LoginButton from "./LoginButton";
import SocialLoginButton from "./SocialLoginButton";

const LoginOptions = () => {
  return (
    <div className="flex w-2/4 flex-col items-center gap-2">
      <LoginButton />
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="kakao" />
    </div>
  );
};

export default LoginOptions;
