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
      className={`flex w-full flex-row items-center justify-center gap-4 rounded-lg p-4 text-subtitle font-medium ${PROVIDER_CONFIG[provider].bgColor} ${PROVIDER_CONFIG[provider].textColor} ${PROVIDER_CONFIG[provider].borderColor} ${PROVIDER_CONFIG[provider].border && "border"}`}
    >
      <Image src={PROVIDER_CONFIG[provider].logo} width={20} height={20} alt={`${provider}Logo`} />
      <span>{PROVIDER_CONFIG[provider].label}</span>
    </button>
  );
};

export default SocialLoginButton;
