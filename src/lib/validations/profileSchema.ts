import type { FormField } from "@/lib/types/auth";
import type { ProfileEditForm } from "@/lib/types/profile";
import { z } from "zod";

export const profileSettingSchema = z.object({
  nickname: z.string().min(2, "닉네임은 최소 2글자 이상이어야 합니다.").max(5, "닉네임은 최대 5글자까지 가능합니다."),
  introduction: z.string().max(100, "한 줄 소개는 최대 100글자까지 가능합니다."),
  gender: z.string({ message: "성별을 선택해주세요." })
});

export const PROFILE_EDIT_FIELD: FormField<ProfileEditForm>[] = [
  { label: "닉네임", id: "nickname", placeholder: "닉네임", type: "text" },
  { label: "한 줄 소개", id: "introduction", placeholder: "안녕하세요!", type: "text" }
];

export const onboardSchema = z.object({
  nickname: z.string().min(2, "닉네임은 최소 2글자 이상이어야 합니다.").max(10, "닉네임은 최대 10글자까지 가능합니다.")
});

export const ONBOARD_FIELD: FormField<Pick<ProfileEditForm, "nickname">>[] = [
  { label: "닉네임", id: "nickname", placeholder: "닉네임", type: "text" }
];
