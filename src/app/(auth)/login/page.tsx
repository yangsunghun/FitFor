import LoginForm from "./_components/LoginForm";
import LoginOptions from "./_components/LoginOptions";

const LoginPage = () => {
  return (
    <div className="h-screen w-full justify-items-center bg-gray-400 p-8">
      <h1>로그인 / 회원가입</h1>
      <LoginForm />
      <LoginOptions />
    </div>
  );
};

export default LoginPage;
