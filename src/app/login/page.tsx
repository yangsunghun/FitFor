import { login } from "@/lib/utils/auth/auth";

const LoginPage = () => {
  return (
    <div className="h-screen w-full p-8 justify-items-center bg-gray-400">
      <form className="flex flex-col w-2/4" autoComplete="off">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
