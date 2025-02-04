"use client";

import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginOptions from "./LoginOptions";

const LoginContent = () => {
  const { hideNavBar, showNavBar } = useNavBarStore();
  const router = useRouter();

  useEffect(() => {
    hideNavBar();
    return () => showNavBar();
  }, [hideNavBar, showNavBar]);

  return (
    <div className="flex w-[34.375rem] flex-col items-center rounded-2xl bg-white p-6 tb:w-full tb:p-0">
      <MinTablet>
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="self-start text-title1 font-bold">로그인</h1>
          <button
            onClick={() => {
              router.back();
            }}
          >
            <X size={24} />
          </button>
        </div>
      </MinTablet>
      <Tablet>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="w-full bg-[url(/images/login-background.png)] bg-cover bg-center tb:h-[48rem] mb:h-[31.25rem]"></div>
          <div className="absolute -bottom-16 h-[7.5rem] w-[150%] bg-gradient-to-b from-white to-white blur-[1.25rem]"></div>
        </div>
      </Tablet>
      <LoginOptions />
    </div>
  );
};

export default LoginContent;
