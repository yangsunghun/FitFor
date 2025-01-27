import SocialLoginButton from "./SocialLoginButton";

const LoginOptions = () => {
  return (
    <div className="mt-6 flex w-full flex-col items-center gap-4 tb:px-4 tb:z-10">
      <SocialLoginButton provider="kakao" />
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="facebook" />
    </div>
  );
};

export default LoginOptions;
