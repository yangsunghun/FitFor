"use client";
import { PROVIDER_CONFIG, Provider } from "@/lib/types/auth";
import { socialLogin } from "@/lib/utils/auth/auth";
import { createClient } from "@/lib/utils/supabase/server";
import Image from "next/image";

type SocialLoginButtonProps = {
  provider: Provider;
};

const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  const handleSocialLogin = async () => {
    await socialLogin(provider);

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    console.log("소셜 로그인 버튼에서", data);

    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`flex flex-row gap-4 p-4 rounded-2xl ${PROVIDER_CONFIG[provider].bgColor} ${PROVIDER_CONFIG[provider].textColor}`}
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
