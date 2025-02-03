"use client";

import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { useEditPostQuery } from "@/lib/hooks/write/usePostQueries";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useEditPageState = (postId: string) => {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const { formState, setInitialFormState, handleFieldChange, ...formHandlers } = useFormHandlers();
  const { data: fetchedData, isPending, isError } = useEditPostQuery(postId);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const isFormInitialized = useRef(false);

  // 간단한 배열 비교 함수
  const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // 게시글 데이터 비교 함수
  const isPostDataEqual = (
    updated: {
      content: string;
      upload_place: string;
      body_size: number[];
      images: string[];
      tags: string[];
      thumbnail_blur_url: string;
    },
    original: {
      content: string;
      upload_place: string;
      body_size: number[];
      images: string[];
      tags: string[];
      thumbnail_blur_url: string;
    }
  ): boolean => {
    return (
      updated.content === original.content &&
      updated.upload_place === original.upload_place &&
      updated.thumbnail_blur_url === original.thumbnail_blur_url &&
      arraysEqual(updated.body_size, original.body_size) &&
      arraysEqual(updated.images, original.images) &&
      arraysEqual(updated.tags, original.tags)
    );
  };

  // 데이터 변경 시 폼 초기화 및 접근 권한 확인
  useEffect(() => {
    if (fetchedData && !isFormInitialized.current) {
      // 게시물 작성자와 현재 사용자가 다르면 접근 차단
      if (!currentUser || fetchedData.post.user_id !== currentUser.id) {
        alert("접근 권한이 없습니다.");
        router.push("/");
        return;
      }
      // 기존 데이터를 폼 상태에 반영
      setInitialFormState({
        ...fetchedData.post,
        purchases: fetchedData.purchases
      });
      isFormInitialized.current = true; // 초기화 플래그 설정
    }
  }, [fetchedData, setInitialFormState, currentUser, router]);

  // 뒤로가기 핸들러를 통합합니다.
  const handleBack = () => {
    // 업데이트할 데이터 객체 구성 (현재 수정된 데이터)
    const updatedData = {
      content: formState.content,
      upload_place: formState.address, // 업데이트 객체에서는 DB에 저장 시 upload_place로 매핑
      body_size: formState.body_size,
      images: formState.images,
      tags: formState.tags,
      thumbnail_blur_url: formState.thumbnail_blur_url
    };

    // 원본 데이터는 fetchedData.post를 그대로 반환한 값(원본 데이터의 주소 필드는 upload_place)
    const originalData = fetchedData?.post;
    if (
      originalData &&
      !isPostDataEqual(updatedData, {
        content: originalData.content || "",
        upload_place: originalData.upload_place || "",
        body_size: originalData.body_size || [],
        images: originalData.images || [],
        tags: originalData.tags || [],
        thumbnail_blur_url: originalData.thumbnail_blur_url || ""
      })
    ) {
      // 변경사항이 있을 경우 ExitOrContinueModal을 띄웁니다.
      setIsExitModalOpen(true);
    } else {
      // 변경사항이 없으면 바로 상세 페이지로 이동합니다.
      router.push(`/detail/${formState.postId}`);
    }
  };

  return {
    formState,
    setInitialFormState,
    isPending,
    isError,
    originalPost: fetchedData?.post, // 원본 데이터를 그대로 반환
    isExitModalOpen,
    setIsExitModalOpen,
    handleBack, // 통합된 뒤로가기 핸들러
    handleFieldChange, // 폼 필드 변경 핸들러
    ...formHandlers
  };
};
