import { z } from "zod";

export const chatRoomSchema = z.object({
  name: z.string().min(1, "채팅방 이름을 입력해주세요.").max(50, "채팅방 이름은 50자를 초과할 수 없습니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z
    .array(z.string())
    .min(1, "최소 하나 이상의 태그를 선택해주세요.")
    .max(7, "태그는 최대 7개까지 선택 가능합니다."),
  thumbnail: z
    .custom<File>((value) => value instanceof File, {
      message: "썸네일 이미지를 업로드해주세요." // 기본 메시지 설정
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, "이미지 크기는 최대 5MB까지 허용됩니다.")
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), "이미지 파일은 JPG 또는 PNG 형식만 허용됩니다.")
});

export type ChatRoomValidate = z.infer<typeof chatRoomSchema>;
