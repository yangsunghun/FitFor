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
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`flex w-full flex-row h-[3.5rem] items-center justify-center gap-4 rounded-lg px-4 text-subtitle font-medium tb:px-[0.781rem] tb:text-body tb:font-medium ${PROVIDER_CONFIG[provider].bgColor} ${PROVIDER_CONFIG[provider].textColor} ${PROVIDER_CONFIG[provider].borderColor} ${PROVIDER_CONFIG[provider].border && "border"}`}
    >
      <div className="h-5 w-5 relative tb:h-4 tb:w-4">
        <Image src={PROVIDER_CONFIG[provider].logo} fill alt={`${provider}Logo`} />
      </div>
      <span>{PROVIDER_CONFIG[provider].label}</span>
    </button>
  );
};

export default SocialLoginButton;
