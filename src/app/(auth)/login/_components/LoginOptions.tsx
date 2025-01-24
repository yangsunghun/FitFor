import SocialLoginButton from "./SocialLoginButton";

const LoginOptions = () => {
  return (
    <div className="mt-6 flex w-full flex-col items-center gap-4">
      <SocialLoginButton provider="kakao" />
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="facebook" />
    </div>
  );
};

export default LoginOptions;
