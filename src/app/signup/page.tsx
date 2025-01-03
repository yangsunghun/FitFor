import { signup } from "@/lib/utils/auth/auth";

const SignupPage = () => {
  return (
    <div className="h-screen w-full p-8 justify-items-center bg-gray-400">
      <form className="flex flex-col w-2/4" autoComplete="off">
        <label htmlFor="nickname">Nickname:</label>
        <input id="nickname" name="nickname" type="text" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <label htmlFor="password-confirm">Password Confirm:</label>
        <input id="password-confirm" name="password-confirm" type="password" required />
        <button formAction={signup}>signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
