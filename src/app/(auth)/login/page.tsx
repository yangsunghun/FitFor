import type { Metadata } from "next";
import LoginContent from "./_components/LoginContent";

export const metadata: Metadata = {
  title: "Fit4 - 로그인",
  description: "Fit4 - 로그인 페이지입니다."
};

const LoginPage = () => {
  return (
    <div className="h-screen w-full justify-items-center p-20 tb:h-auto tb:p-0">
      <LoginContent />
    </div>
  );
};

export default LoginPage;
