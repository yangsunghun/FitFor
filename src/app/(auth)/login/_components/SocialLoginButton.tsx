"use client";
import { PROVIDER_CONFIG, Provider } from "@/lib/types/auth";
import { socialLogin } from "@/lib/utils/auth/auth";
import Image from "next/image";

type SocialLoginButtonProps = {
  provider: Provider;
};

const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  const handleSocialLogin = async () => {
    await socialLogin(provider);

    // 헤더(layout)에서 로그인 정보
    // 리소스 많이 잡아먹지 않음

    // + trigger (SQL)
    // 잘 인지 못했을때 수정이 어려울 수 있습니다.

    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`flex flex-row gap-4 rounded-2xl p-4 ${PROVIDER_CONFIG[provider].bgColor} ${PROVIDER_CONFIG[provider].textColor}`}
    >
      <Image
        src={PROVIDER_CONFIG[provider].logo}
        width={24}
        height={24}
        alt={`${provider}Logo`}
        className={`${PROVIDER_CONFIG[provider].logoClass}`}
      />
      <span>{PROVIDER_CONFIG[provider].label}</span>
    </button>
  );
};

export default SocialLoginButton;
