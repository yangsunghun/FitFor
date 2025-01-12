import LoginOptions from "./_components/LoginOptions";

const LoginPage = () => {
  return (
    <div className="h-screen w-full justify-items-center p-8">
      <div className="flex w-1/4 flex-col items-center">
        <h1 className="self-start text-heading font-bold">로그인</h1>
        <LoginOptions />
      </div>
    </div>
  );
};

export default LoginPage;
