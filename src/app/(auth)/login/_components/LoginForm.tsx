"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/utils/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string({message: "이메일 주소를 입력해주세요."}).email({ message: "유효하지 않은 이메일 형식입니다." }),
  password: z
  .string()
  .regex(
    new RegExp(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
    ),
    '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요',
  ).min(6, "6자리 이상 입력해주세요"),
});

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  });

  const handleLogin = async (value: FieldValues) => {
    console.log(value);

    // const userInfo = await login(loginSchema.parse(value));
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
          {...register("email")}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        {formState.errors.email && (
          <span className="mb-2 text-red-800">{formState.errors.email.message as string}</span>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        {formState.errors.password && (
          <span className="mb-2 text-red-800">{formState.errors.password.message as string}</span>
        )}

        {/* TODO: 버튼 디자인 임시로 색 넣음 */}
        <button
          type="submit"
          className="flex w-full flex-row justify-center gap-4 rounded-2xl bg-[#FF3365] p-4 font-bold disabled:bg-[#FFD6E0]"
          disabled={!formState.isValid}
        >
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
