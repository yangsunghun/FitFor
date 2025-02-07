"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { Database } from "@/lib/types/supabase";
import { toast } from "@/lib/utils/common/toast";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import useMediaQuery from "../common/useMediaQuery";
import { UseFormStateHandlersReturn } from "./useFormStateHandlers"; // formState 타입 가져오기
import { fetchUnsavedPosts, TempSaveState } from "./useTempSaveHandlers";

const supabase = createClient();

type UsePostHandlersProps = Pick<UseFormStateHandlersReturn, "formState" | "originalDataRef"> & {
  setTempSaveState: Dispatch<SetStateAction<TempSaveState>>;
};

export const usePostHandlers = ({ formState, setTempSaveState, originalDataRef }: UsePostHandlersProps) => {
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기
  const router = useRouter();
  // 원래의 router.push 기능을 보존하기 위한 ref 선언 (unsaved 변경사항 체크 로직을 우회할 때 사용)
  const originalPushRef = useRef(router.push);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const [missingFields, setMissingFields] = useState<string[]>([]); // 누락된 필드를 상태로 관리
  const { content, address, body_size, images, tags, purchases, thumbnail_blur_url, postId } = formState;

  const validateFields = useCallback(() => {
    const newMissingFields: string[] = [];
    if (!content) newMissingFields.push("content");
    if (!images || images.length === 0) newMissingFields.push("images");
    if (!purchases || purchases.length === 0) newMissingFields.push("purchases");
    if (!tags || tags.length === 0) newMissingFields.push("tags");

    setMissingFields(newMissingFields); // 누락된 필드 상태 업데이트
    return newMissingFields.length === 0; // 모든 필드가 채워졌는지 여부 반환
  }, [content, images, purchases, tags]); // 의존성 배열에 해당 상태들을 추가

  useEffect(() => {
    if (isTabletOrSmaller) {
      validateFields();
    }
  }, [isTabletOrSmaller, validateFields]);

  // 값 변경 시 누락된 필드 실시간 업데이트
  const updateMissingFields = (field: string, value: any) => {
    setMissingFields((prev) => {
      // 값이 비어있거나 배열이 비었을 경우 필수 필드 추가
      const isEmpty = !value || (Array.isArray(value) && value.length === 0);
      if (isEmpty && !prev.includes(field)) {
        return [...prev, field];
      }
      // 값이 채워져 있을 경우 필수 필드에서 제거
      if (!isEmpty && prev.includes(field)) {
        return prev.filter((missingField) => missingField !== field);
      }
      return prev;
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (handleStartSubmit: () => void, handleEndSubmit: () => void) => {
    if (!validateFields()) {
      // 유효하지 않은 경우 메시지 표시
      if (!isTabletOrSmaller) {
        toast("필수 항목을 모두 입력해주세요!", "warning");
      }
      window.scrollTo(0, 0); // 즉시 최상단으로 이동
      return;
    }

    // 로그인 여부 확인
    if (!currentUser || !currentUser.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    handleStartSubmit(); // 제출 시작 플래그 설정
    try {
      let savedPostId = postId;

      // 기존 게시글인지 확인 후 업데이트 또는 새로 생성
      if (postId) {
        // 기존 게시글 업데이트
        const updatedPost = {
          content,
          upload_place: address,
          body_size,
          images,
          tags,
          thumbnail_blur_url,
          is_saved: false, // 저장 상태로 변경
          created_at: new Date().toISOString()
        };

        const { error: updateError } = await supabase.from("posts").update(updatedPost).eq("id", postId);

        if (updateError) throw updateError;

        savedPostId = postId; // 업데이트된 게시글 ID
      } else {
        // 새 게시글 생성
        const post: Omit<Database["public"]["Tables"]["posts"]["Insert"], "id"> & { id?: string } = {
          content,
          upload_place: address,
          created_at: new Date().toISOString(),
          user_id: currentUser.id,
          body_size,
          images,
          tags,
          thumbnail_blur_url,
          is_saved: false, // 저장 상태로 설정
          comments: 0,
          likes: 0,
          view: 0
        };

        // 게시글 저장
        const { data: postData, error: postError } = await supabase.from("posts").insert([post]).select();

        if (postError) throw postError;

        savedPostId = postData[0].id; // 생성된 게시글 ID
      }

      // 상품 데이터 저장
      if (purchases.length > 0) {
        const purchaseData = purchases.map((purchase) => ({
          ...purchase,
          post_id: savedPostId
        }));

        const { error: purchaseError } = await supabase.from("purchase").upsert(purchaseData);

        if (purchaseError) throw purchaseError;
      }

      // 임시저장 목록 갱신
      const updatedUnsavedPosts = await fetchUnsavedPosts(currentUser.id);
      setTempSaveState((prevState) => ({
        ...prevState,
        unsavedPosts: updatedUnsavedPosts.filter((post) => post.is_saved),
        isWriting: prevState.isWriting // 누락 방지
      }));

      toast("게시글이 등록되었습니다.", "success");

      // 업데이트 후 페이지 이동 시, 기존의 router.push는 unsaved 체크 로직에 의해 override될 수 있음
      // 따라서 originalPushRef.current를 사용하여 unsaved 체크 우회시키는 과정 필요
      originalPushRef.current(`/detail/${savedPostId}`);
    } catch (error) {
      console.error("게시글 저장 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    } finally {
      handleEndSubmit(); // 제출 종료 플래그 해제
    }
  };

  // 업데이트 핸들러
  // options.skipUnsavedCheck 옵션이 true? unsaved 체크를 우회한다!
  const handleUpdate = async (id: string, options?: { skipUnsavedCheck?: boolean }) => {
    if (!validateFields()) {
      // 유효하지 않은 경우 메시지 표시
      toast("필수 입력 항목을 모두 입력해주세요!", "warning");
      window.scrollTo(0, 0); // 즉시 최상단으로 이동
      return;
    }

    const updatedPost = {
      content,
      upload_place: address,
      body_size,
      images,
      tags,
      thumbnail_blur_url
    };

    // 원본 데이터 비교:
    if (
      originalDataRef.current &&
      JSON.stringify(updatedPost) ===
        JSON.stringify({
          content: originalDataRef.current.content,
          upload_place: originalDataRef.current.address, // 주의: originalDataRef에 address로 저장되었는지 확인하세요.
          body_size: originalDataRef.current.body_size,
          images: originalDataRef.current.images,
          tags: originalDataRef.current.tags,
          thumbnail_blur_url: originalDataRef.current.thumbnail_blur_url
        })
    ) {
      toast("업데이트할 내용이 없습니다.", "warning");
      return;
    }

    try {
      // 게시글 업데이트 처리
      const { error: postError } = await supabase.from("posts").update(updatedPost).eq("id", id);
      if (postError) throw postError;

      // 기존 구매 데이터 삭제
      const { error: deleteError } = await supabase.from("purchase").delete().eq("post_id", id);
      if (deleteError) throw deleteError;

      // 새 구매 데이터 삽입
      if (purchases.length > 0) {
        const purchaseData = purchases.map((purchase) => ({
          ...purchase,
          post_id: id
        }));

        const { error: purchaseError } = await supabase.from("purchase").insert(purchaseData);
        if (purchaseError) throw purchaseError;
      }

      toast("게시글이 수정되었습니다.", "success");

      // 만약 skipUnsavedCheck 옵션이 true라면, 원래의 router.push를 사용해 unsaved 체크를 우회합니다.
      if (options?.skipUnsavedCheck) {
        originalPushRef.current(`/detail/${id}`);
      } else {
        router.push(`/detail/${id}`);
      }
    } catch (error) {
      console.error("게시물 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return {
    missingFields,
    updateMissingFields,
    handleSubmit,
    handleUpdate
  };
};
