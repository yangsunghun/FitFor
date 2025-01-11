import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({required_error: "이메일을 입력해주세요."}).email({ message: "유효하지 않은 이메일 형식입니다." }),
  password: z
    .string({required_error: "비밀번호를 입력해주세요."})
    .regex(
      new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/),
      "영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요"
    )
});

