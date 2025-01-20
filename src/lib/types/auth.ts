import googleLogo from "@/assets/images/google-logo.svg";
import kakaoLogo from "@/assets/images/kakao-logo.svg";
import facebookLogo from "@/assets/images/facebook-logo.svg"
import { Database } from "@/lib/types/supabase";
import type { HTMLInputTypeAttribute } from "react";

export type UserType = Database["public"]["Tables"]["users"]["Row"];

export type Provider = "google" | "kakao" | "facebook";

export type ProviderConfig = {
  label: string;
  bgColor: string;
  border: boolean;
  borderColor?: string;
  textColor: string;
  logo: string;
  queryParams?: Record<string, string>;
};

export const PROVIDER_CONFIG: Record<Provider, ProviderConfig> = {
  google: {
    label: "구글로 계속하기",
    bgColor: "bg-white",
    border: true,
    borderColor: "border-[#d6d6d6]",
    textColor: "text-[#6e6e6e]",
    logo: googleLogo,
    queryParams: {
      access_type: "offline",
      prompt: "consent select_account"
    }
  },
  kakao: {
    label: "카카오로 계속하기",
    border: false,
    bgColor: "bg-[#ffeb00]",
    textColor: "text-[#1a1a1a]",
    logo: kakaoLogo
  },
  facebook: {
    label: "페이스북으로 계속하기",
    border: false,
    bgColor: "bg-[#0c6efd]",
    textColor: "text-white",
    logo: facebookLogo
  }
};

export type FormField<T> = {
  id: keyof T;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  validation?: object;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender?: string;
};
