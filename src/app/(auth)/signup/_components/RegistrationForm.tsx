"use client";
import { signup } from "@/lib/utils/auth/auth";
import { SIGNUP_FIELDS } from "@/lib/validations/authFields";
import { signupSchema } from "@/lib/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, type FieldValues } from "react-hook-form";
import AuthInput from "../../_components/AuthInput";

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
    await signup(signupSchema.parse(value));

    window.location.href = "/login";
  };

  return (
    <>
      <form className="mt-8 flex w-full flex-col" autoComplete="off" onSubmit={handleSubmit(handleSignup)}>
        {SIGNUP_FIELDS.map((field) => (
          <AuthInput
            key={field.id}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            error={formState.errors[field.id]?.message}
          />
        ))}
        {formState.errors.root && <span>{formState.errors.root.message}</span>}
        <button
          type="submit"
          className="flex w-full flex-row justify-center gap-4 rounded-2xl bg-[#FF3365] p-4 font-bold disabled:bg-[#FFD6E0]"
          disabled={!formState.isValid}
        >
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
