"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { createClient } from "@/lib/utils/supabase/client";
import { useState } from "react";
import { PostWithPurchases, UseFormStateHandlersReturn } from "./useFormStateHandlers";

const supabase = createClient();
type UseTempSaveHandlersProps = Pick<UseFormStateHandlersReturn, "formState" | "handleChange" | "setInitialFormState">;

export type TempSaveState = {
  unsavedPosts: PostWithPurchases[];
  activePostId: string | null;
  isWriting: boolean; // 작성 여부 추가
};

// 임시 저장 게시글 가져오기 함수 (개별 내보내기)
export const fetchUnsavedPosts = async (userId: string): Promise<PostWithPurchases[]> => {
  try {
    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .eq("is_saved", true)
      .order("created_at", { ascending: false });

    if (postsError || !postsData) {
      console.error("임시 저장된 게시물 가져오기 실패:", postsError);
      return [];
    }

    const postIds = postsData.map((post) => post.id);
    const { data: purchasesData, error: purchasesError } = await supabase
      .from("purchase")
      .select("*")
      .in("post_id", postIds);

    if (purchasesError) {
      console.error("구매 데이터 가져오기 실패:", purchasesError);
    }

    return postsData.map((post) => ({
      ...post,
      purchases: purchasesData?.filter((purchase) => purchase.post_id === post.id) || []
    }));
  } catch (error) {
    console.error("임시 저장된 게시물 가져오기 중 오류:", error);
    return [];
  }
};

// useTempSaveHandlers
export const useTempSaveHandlers = ({ formState, handleChange, setInitialFormState }: UseTempSaveHandlersProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const [tempSaveState, setTempSaveState] = useState<TempSaveState>({
    unsavedPosts: [],
    activePostId: null,
    isWriting: false
  });

  // 이어서 작성 핸들러
  const handleContinuePost = async (post: PostWithPurchases) => {
    try {
      if (post.id === tempSaveState.activePostId) {
        alert("현재 작성 중인 글입니다.");
        return;
      }

      await setInitialFormState(post);
      setTempSaveState((prevState) => ({
        ...prevState,
        isWriting: true, // 이어서 작성 중 상태 활성화
        activePostId: post.id
      }));
    } catch (error) {
      console.error("게시물 불러오기 실패:", error);
      alert("게시물 불러오기 중 오류가 발생했습니다.");
    }
  };

  // 임시저장 삭제 핸들러
  const handleDiscardPost = async (postId: string) => {
    try {
      // 활성화된 게시글은 삭제 불가능
      if (postId === tempSaveState.activePostId) {
        alert("이미 작성 중인 게시글은 삭제가 불가능합니다.");
        return;
      }

      // 게시글 삭제
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;

      alert("임시 저장 게시물이 삭제되었습니다.");

      // 삭제 후 리스트 갱신
      const updatedPosts = await fetchUnsavedPosts(currentUser?.id || "");
      setTempSaveState((prevState) => ({ ...prevState, unsavedPosts: updatedPosts })); // 최신 상태로 갱신
      return; // 삭제 완료 후 로직 종료
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
      alert("게시물 삭제 중 오류가 발생했습니다.");
    }
  };

  // 임시 저장 핸들러 (기존 게시물 업데이트 및 새로운 게시물 생성)
  const handleTemporarySave = async () => {
    const { content, address, body_size, images, tags, purchases, thumbnail_blur_url, postId } = formState;

   // 작성 여부 판단: 하나라도 입력된 값이 있으면 저장 가능
   const isFormFilled =
   content.trim().length > 0 ||
   address.trim().length > 0 ||
   images.length > 0 ||
   tags.length > 0 ||
   Object.values(body_size || {}).some((value) => value) || // body_size 필드 값 체크
   purchases.length > 0;

 if (!isFormFilled) {
   alert("작성된 항목이 없습니다. 내용을 입력해주세요.");
   return;
 }

    if (!currentUser?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      let newPostId = postId; // postId로 업데이트 여부 확인

      if (postId) {
        // 기존 게시글 가져오기
        const { data: existingPost, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (fetchError) throw fetchError;

        // 변경 사항 비교
        const isIdentical =
          existingPost?.content === content &&
          existingPost?.upload_place === address &&
          JSON.stringify(existingPost?.body_size) === JSON.stringify(body_size) &&
          JSON.stringify(existingPost?.images) === JSON.stringify(images) &&
          JSON.stringify(existingPost?.tags) === JSON.stringify(tags) &&
          existingPost?.thumbnail_blur_url === thumbnail_blur_url;

        if (isIdentical) {
          alert("업데이트할 내용이 없습니다.");
          return; // 변경 사항이 없으면 저장 중단
        }

        // 기존 게시글 업데이트 로직
        const updatedPost = {
          content,
          upload_place: address,
          created_at: new Date().toISOString(),
          body_size,
          images,
          tags,
          thumbnail_blur_url,
          is_saved: true
        };

        const { error: updateError } = await supabase.from("posts").update(updatedPost).eq("id", postId);
        if (updateError) throw updateError;

        // `unsavedPosts` 상태 업데이트
        setTempSaveState((prevState) => ({
          ...prevState,
          isWriting: false, // 작성 중 상태 초기화
          unsavedPosts: prevState.unsavedPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
        }));

        alert("업데이트 완료!");
      } else {
        // 새로운 게시글 생성 로직
        const newPost = {
          content,
          upload_place: address,
          created_at: new Date().toISOString(),
          user_id: currentUser.id,
          body_size,
          images,
          tags,
          thumbnail_blur_url,
          is_saved: true,
          comments: 0,
          likes: 0,
          view: 0
        };

        const { data: postData, error: insertError } = await supabase.from("posts").insert([newPost]).select();
        if (insertError) throw insertError;

        newPostId = postData[0].id;

        // `unsavedPosts` 상태 업데이트
        setTempSaveState((prevState) => ({
          ...prevState,
          isWriting: false, // 작성 중 상태 초기화
          unsavedPosts: [{ ...newPost, id: newPostId, purchases: [] }, ...prevState.unsavedPosts]
        }));

        handleChange("postId", newPostId);
        handleChange("isContinued", true);

        alert("임시 저장 완료!");
      }

      // 상품 데이터 저장 (공통)
      const purchaseData = purchases.map((purchase) => ({
        ...purchase,
        post_id: newPostId // 업데이트 또는 새 저장된 Post ID
      }));

      const { error: purchaseError } = await supabase.from("purchase").upsert(purchaseData);
      if (purchaseError) throw purchaseError;

      setTempSaveState((prevState) => ({ ...prevState, activePostId: newPostId })); // 활성화된 Post ID 업데이트
    } catch (error) {
      console.error("임시 저장 실패:", error);
      alert("임시 저장 실패");
    }
  };

  // 작성 여부 판단 핸들러
  const checkIsWriting = () => {
    const { content, images, address, body_size, purchases, tags } = formState;
    return (
      content.length > 0 ||
      images.length > 0 ||
      address.length > 0 ||
      Object.values(body_size || {}).some((val) => val) || // body_size 필드 값 체크
      purchases.length > 0 || 
      tags.length > 0
    );
  };

  // 폼 상태 변경 핸들러
  const handleFieldChange = <T extends keyof typeof formState>(key: T, value: (typeof formState)[T]) => {
    handleChange(key, value);
    const isWriting = checkIsWriting();
    setTempSaveState((prevState) => ({
      ...prevState,
      isWriting // 항상 업데이트
    }));
  };

  return {
    tempSaveState,
    setTempSaveState,
    fetchUnsavedPosts,
    handleContinuePost,
    handleDiscardPost,
    handleTemporarySave,
    checkIsWriting,
    handleFieldChange
  };
};
