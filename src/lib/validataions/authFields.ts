import type { FormField, LoginForm } from "@/lib/types/auth";

export const LOGIN_FIELDS: FormField<LoginForm>[] = [
  {
    type: "email",
    placeholder: "이메일을 입력해주세요.",
    id: "email",
    label: "이메일"
  },
  {
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    id: "password",
    label: "비밀번호"
  }
];

export const SIGNUP_FIELDS = [
  {
    type: "nickname",
    placeholder: "닉네임(이름)을 입력해주세요.",
    id: "nickname",
    label: "닉네임"
  },
  {
    type: "email",
    placeholder: "이메일을 입력해주세요.",
    id: "email",
    label: "이메일"
  },
  {
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    id: "password",
    label: "비밀번호"
  },
  {
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요.",
    id: "passwordConfirm",
    label: "비밀번호 확인"
  }
];
