import { z } from "zod";

export const profileSettingSchema = z.object({
  nickname: z.string().min(2, "닉네임은 최소 2글자 이상이어야 합니다.").max(5, "닉네임은 최대 5글자까지 가능합니다."),
  introduction: z.string().max(50, "한 줄 소개는 최대 20글자까지 가능합니다."),
  gender: z.string({ message: "성별을 선택해주세요." })
});
