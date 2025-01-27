"use client";

import TagSection from "@/components/shared/TagSection";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { chatRoomSchema, type ChatRoomValidate } from "@/lib/validations/chatRoomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import ThumbnailUploadSection from "./ThumbnailUploadSection";
import TitleSection from "./TitleSection";
import { uploadThumbnail } from "@/lib/utils/chat/uploadThumbnail";
import { createChatRoom } from "@/lib/utils/chat/chat";
import { cn } from "@/lib/utils/common/className";

const ChatRoomForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<ChatRoomValidate>({
    resolver: zodResolver(chatRoomSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      tags: [],
      thumbnail: undefined
    }
  });

  const currentUser = useAuthStore((state) => state.user);

  const onSubmit: SubmitHandler<ChatRoomValidate> = async (data) => {
    try {
      if (!currentUser?.id) {
        alert("로그인이 필요합니다.");
        return;
      }

      const thumbnailUrl = await uploadThumbnail(data.thumbnail);
      if (!thumbnailUrl) {
        throw new Error("썸네일 업로드에 실패했습니다.");
      }

      // 채팅방 생성
      const chatRoomDetails = {
        title: data.name,
        thumbnailUrl,
        tags: data.tags
      };

      const result = await createChatRoom(currentUser.id, chatRoomDetails);

      if (!result.success) {
        throw new Error(`채팅방 생성 실패: ${result.error}`);
      }

      alert("채팅방이 성공적으로 생성되었습니다!");

      // 생성된 채팅방의 상세 페이지로 이동
      router.push(`/chat/${result.data?.room_id}`);
    } catch (error) {
      console.error("에러 발생:", error);
      alert(error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-20 rounded-2xl border border-line-02 bg-bg-01 px-8 py-9 mb:p-4">
        {/* 타이틀 */}
        <TitleSection
          title={watch("name")}
          onChange={(value) => setValue("name", value)}
          error={errors.name?.message}
        />

        {/* 카테고리 및 태그 */}
        <TagSection
          title="Live 주제를 선택해주세요."
          tags={watch("tags")}
          selectedCategory={watch("category")}
          onChangeCategory={(category) => setValue("category", category)}
          toggleTagSelector={(tag, allTags, max) => {
            const currentTags = watch("tags");
            if (currentTags.includes(tag)) {
              setValue(
                "tags",
                currentTags.filter((t) => t !== tag)
              );
            } else if (currentTags.length >= 1) {
              // 여기에서도 동일한 maxTags와 제한을 적용 가능
              alert("하나의 태그만 선택해주세요.");
            } else {
              setValue("tags", [...currentTags, tag]);
            }
          }}
          maxTags={1} // 이 값을 5로 설정하여 최대 5개로 표시
        />

        {errors.tags && <p className="text-sm mt-2 text-red-600">{errors.tags.message}</p>}

        {/* 썸네일 업로드 */}
        <ThumbnailUploadSection
          thumbnail={watch("thumbnail")}
          onChange={(file) => setValue("thumbnail", file)}
          error={errors.thumbnail?.message}
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className={cn(
            buttonVariants({ variant: isValid ? "primary" : "disabled", size: "md" }), // 상태에 따라 스타일 동적 변경
            "mb:w-full" // 추가적인 스타일
          )}
        >
          Live 만들기
        </Button>
      </div>
    </form>
  );
};

export default ChatRoomForm;
