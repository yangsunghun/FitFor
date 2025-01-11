"use client";
import { signup } from "@/lib/utils/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

const signupSchema = z
  .object({
    nickname: z
      .string({ required_error: "이메일을 입력해주세요." })
      .max(20, { message: "20자 이하의 닉네임을 설정해주세요." }),
    email: z
      .string({ required_error: "이메일을 입력해주세요." })
      .email({ message: "유효하지 않은 이메일 형식입니다." }),
    password: z
      .string({ required_error: "이메일을 입력해주세요." })
      .regex(
        new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/),
        "영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요"
      ),
    passwordConfirm: z
      .string({ required_error: "이메일을 입력해주세요." })
      .regex(
        new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/),
        "영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요"
      ),
    gender: z.string().optional()
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"]
  });

const RegistrationForm = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onTouched",
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      gender: ""
    },
    resolver: zodResolver(signupSchema)
  });

  const handleSignup = async (value: FieldValues) => {
    alert("서비스 준비 중")
    // await signup(formData);

    // window.location.href = "/login";
  };

  return (
    <>
      <form className="mt-8 flex w-full flex-col" autoComplete="off" onSubmit={handleSubmit(handleSignup)}>
        {/* <AuthInput type="text" placeholder="닉네임" />
        <AuthInput type="email" placeholder="이메일" />
        <AuthInput type="password" placeholder="비밀번호" />
        <AuthInput type="password" placeholder="비밀번호 확인" /> */}
        <input
          type="text"
          placeholder="닉네임 (이름)"
          {...register("nickname")}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        <input
          type="email"
          placeholder="이메일"
          {...register("email")}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        <input
          type="email"
          placeholder="비밀번호"
          {...register("password")}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        <input
          type="email"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm")}
          className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
        />
        <button type="submit" className="flex w-full flex-row justify-center gap-4 rounded-2xl border p-4">
          회원가입
        </button>
      </form>
      <p className="my-2">
        계정이 있으신가요?{` `}
        <Link href="/login" className="text-blue-900">
          로그인
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
