import { useEffect, useRef } from "react";
import { useEditPostQuery } from "@/lib/hooks/write/usePostQueries";
import { useAuthStore } from "@/lib/store/authStore";
import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { useRouter } from "next/navigation";

export const useEditPageState = (postId: string) => {
    const router = useRouter();
    const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기
  const { formState, setInitialFormState, ...formHandlers } = useFormHandlers();
  const { data: fetchedData, isPending, isError } = useEditPostQuery(postId);
    // 폼 초기화 플래그 관리
  const isFormInitialized = useRef(false);

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

  return {
    formState,
    setInitialFormState,
    isPending,
    isError,
    ...formHandlers,
  };
};