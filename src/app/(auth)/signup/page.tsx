import RegistrationForm from "./_components/RegistrationForm";

const SignupPage = () => {
  return (
    <div className="h-screen w-full justify-items-center p-8">
      <div className="flex w-1/4 flex-col items-center">
        <h1 className="self-start text-heading font-bold">회원가입</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default SignupPage;
