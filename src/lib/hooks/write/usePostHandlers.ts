"use client";

import { useAuthStore } from "@/lib/store/authStore";
import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useFormStateHandlers } from "./useFormStateHandlers";

const supabase = createClient();

export const usePostHandlers = () => {
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기
  const { formState } = useFormStateHandlers();
  const router = useRouter();

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    const { content, address, body_size, images, tags, purchases, thumbnail_blur_url } = formState;

    // 필수 입력 값 확인
    if (!content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 로그인 여부 확인
    if (!currentUser || !currentUser.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 게시글 데이터 생성
    try {
      const post: Omit<Database["public"]["Tables"]["posts"]["Insert"], "id"> & { id?: string } = {
        content,
        upload_place: address,
        created_at: new Date().toISOString(),
        user_id: currentUser.id,
        body_size,
        images,
        tags,
        thumbnail_blur_url,
        is_saved: false, // 최종 저장이
        comments: 0,
        likes: 0,
        view: 0
      };

      // 게시글 저장
      const { data: postData, error: postError } = await supabase.from("posts").insert([post]).select();

      if (postError) throw postError;

      const postId = postData[0].id; // 저장된 게시글 ID

      // 상품 데이터 저장
      if (purchases.length > 0) {
        const purchaseData = purchases.map((purchase) => ({
          ...purchase,
          post_id: postId
        }));

        const { error: purchaseError } = await supabase.from("purchase").insert(purchaseData);

        if (purchaseError) throw purchaseError;
      }

      alert("저장 성공!");

      // 상세 페이지로 리디렉션
      router.push(`/detail/${postId}`);
    } catch (error) {
      console.error("게시글 저장 실패:", error);
      alert("저장 실패");
    }
  };

  //업데이트 핸들러
  const handleUpdate = async (id: string) => {
    const { content, address, body_size, images, tags, purchases } = formState;

    try {
      const updatedPost = {
        content,
        upload_place: address,
        body_size,
        images,
        tags
      };

      // 게시물 업데이트
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

      alert("수정 성공!");
      router.push(`/detail/${id}`);
    } catch (error) {
      console.error("게시물 수정 실패:", error);
      alert("수정 실패");
    }
  };

  return {
    handleSubmit,
    handleUpdate
  };
};
