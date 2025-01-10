"use client";
import { login } from "@/lib/utils/auth/auth";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";

const LoginForm = () => {
  // react-hook-form
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur"
  });

  const handleLogin = async (value: FieldValues) => {
    console.log(value);

    // const userInfo = await login(value);
    // // zustand에 저장
    // if (userInfo) {
    //   useAuthStore.getState().setUser(userInfo);
    //   // home으로 push
    //   window.location.href = "/";
    // } else {
    //   alert("로그인 정보가 잘못 되었습니다.");
    // }
  };

  return (
    <>
      <form className="flex w-full flex-col" autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
        {/* TODO: input design */}
        <input
          type="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일을 적어주세요",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "유효하지 않은 이메일 형식입니다"
            }
          })}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        {formState.errors.email && (
          <span className="mb-2 text-red-800">{formState.errors.email.message as string}</span>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("passwrod", {
            required: true
          })}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        {formState.errors.password && (
          <span className="mb-2 text-red-800">{formState.errors.password.message as string}</span>
        )}

        {/* TODO: 버튼 디자인 임시로 색 넣음 */}
        <button type="submit" className="flex w-full flex-row justify-center gap-4 rounded-2xl p-4 bg-[#FF3365] font-bold disabled:bg-[#FFD6E0]" disabled={!formState.isValid}>
          로그인
        </button>
      </form>
      <p className="my-2">
        계정이 없으신가요?{` `}
        <Link href="/signup" className="text-blue-900">
          회원가입
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
