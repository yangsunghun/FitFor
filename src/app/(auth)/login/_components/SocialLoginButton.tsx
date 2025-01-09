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

    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`flex flex-row gap-4 rounded-2xl p-4 w-2/4 justify-center ${PROVIDER_CONFIG[provider].bgColor} ${PROVIDER_CONFIG[provider].textColor}`}
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
