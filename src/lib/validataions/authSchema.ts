import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "이메일을 입력해주세요." }).email({ message: "유효하지 않은 이메일 형식입니다." }),
  password: z
    .string({ required_error: "비밀번호를 입력해주세요." })
    .regex(
      new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/),
      "영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요"
    )
});

export const signupSchema = z
  .object({
    nickname: z
      .string({ required_error: "이메일을 입력해주세요." }).min(3, {message: "3자 이상의 닉네임을 설정해주세요."})
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
