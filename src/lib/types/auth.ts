import googleLogo from "@/assets/images/google-logo.svg";
import kakaoLogo from "@/assets/images/kakao-logo.svg";
import { Database } from "./supabase";
import type { HTMLInputTypeAttribute } from "react";

export type User = Database["public"]["Tables"]["users"]["Row"];

export type Provider = "google" | "kakao";

export type ProviderConfig = {
  label: string;
  bgColor: string;
  textColor: string;
  logo: string;
  queryParams?: Record<string, string>;
};

export const PROVIDER_CONFIG: Record<Provider, ProviderConfig> = {
  google: {
    label: "Google 계정으로 시작",
    bgColor: "bg-white",
    textColor: "text-[#666666]",
    logo: googleLogo,
    queryParams: {
      access_type: "offline",
      prompt: "consent select_account"
    }
  },
  kakao: {
    label: "Kakao 계정으로 시작",
    bgColor: "bg-[#ffeb00]",
    textColor: "text-[#333333]",
    logo: kakaoLogo
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
