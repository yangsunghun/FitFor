"use client";

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ChatRoomFormInputs } from "../page";
import { chatRoomSchema } from "@/lib/validations/chatRoomSchema";
import TagSection from "@/components/shared/TagSection";
import TitleSection from "./TitleSection";
import ThumbnailUploadSection from "./ThumbnailUploadSection";
import { useAuthStore } from "@/lib/store/authStore";
import { uploadThumbnail } from "../../_utils/uploadThumbnail";
import { createChatRoom } from "../../_utils/chat";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const ChatRoomForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ChatRoomFormInputs>({
    resolver: zodResolver(chatRoomSchema),
    defaultValues: {
      name: "",
      category: "",
      tags: [],
      thumbnail: undefined
    }
  });

  const currentUser = useAuthStore((state) => state.user);

  const onSubmit: SubmitHandler<ChatRoomFormInputs> = async (data) => {
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
      <div className="mb-20 rounded-2xl border border-line-02 bg-bg-01 px-8 py-9">
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
            const selectedGroupTags = currentTags.filter((t) => allTags.includes(t));

            if (!currentTags.includes(tag) && currentTags.length >= 7) {
              alert("태그는 최대 7개까지 선택 가능합니다.");
              return;
            }

            if (selectedGroupTags.includes(tag)) {
              setValue(
                "tags",
                currentTags.filter((t) => t !== tag)
              ); // 선택 해제
            } else if (selectedGroupTags.length < max) {
              setValue("tags", [...currentTags, tag]); // 태그 추가
            } else {
              alert(`해당 카테고리에서는 최대 ${max}개의 태그만 선택 가능합니다.`);
            }
          }}
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
        <Button type="submit" variant={"primary"}>
          Live 만들기
        </Button>
      </div>
    </form>
  );
};

export default ChatRoomForm;
