import LoginOptions from "./LoginOptions";

const LoginContent = () => {
  return (
    <div className="flex w-[34.375rem] flex-col items-center bg-white rounded-2xl p-6">
      <h1 className="self-start text-title1 font-bold">로그인</h1>
      <LoginOptions />
    </div>
  );
};

export default LoginContent;
