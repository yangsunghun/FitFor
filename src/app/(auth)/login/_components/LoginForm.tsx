"use client";
import AuthInput from "@/app/(auth)/_components/AuthInput";
import { login } from "@/lib/utils/auth/auth";
import { LOGIN_FIELDS } from "@/lib/validations/authFields";
import { loginSchema } from "@/lib/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

// 일반 로그인 폼
const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  });

  // 로그인 후 홈으로 이동
  const handleLogin = async (value: FieldValues) => {
    await login(loginSchema.parse(value));

    window.location.href = "/";
  };

  return (
    <>
      <form className="flex w-full flex-col" autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
        {LOGIN_FIELDS.map((field) => (
          <AuthInput
            key={field.id}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            error={formState.errors[field.id]?.message}
          />
        ))}
        <button
          type="submit"
          className="flex w-full flex-row justify-center gap-4 rounded-2xl bg-[#FF3365] p-4 font-bold disabled:bg-[#FFD6E0]"
          disabled={!formState.isValid}
        >
          로그인
        </button>
      </form>
      {/* <p className="my-2">
        계정이 없으신가요?{` `}
        <Link href="/signup" className="text-blue-900">
          회원가입
        </Link>
      </p> */}
    </>
  );
};

export default LoginForm;
