import { signup } from "@/lib/utils/auth/auth";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="h-screen w-full justify-items-center bg-gray-400 p-8">
      <form className="flex w-2/4 flex-col" autoComplete="off">
        <label htmlFor="nickname">닉네임:</label>
        <input id="nickname" name="nickname" type="text" required />
        <label htmlFor="email">이메일:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">비밀번호:</label>
        <input id="password" name="password" type="password" required />
        <label htmlFor="password-confirm">비밀번호 확인:</label>
        <input id="password-confirm" name="password-confirm" type="password" required />
        <button formAction={signup}>회원가입</button>
      </form>
      <p>
        계정이 있으신가요?{` `}
        <Link href="/login" className="text-blue-900">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
