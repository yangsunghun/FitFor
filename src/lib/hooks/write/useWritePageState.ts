import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useRef, useState } from "react";

export type UseWritePageStateReturn = ReturnType<typeof useWritePageState>;

export const useWritePageState = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [state, setState] = useState({
    isExitModalOpen: false,
    isContinueModalOpen: false, // 모달 오픈 상태 추가
    isWriting: false,
    pendingNavigation: null as string | null,
    unsavedPosts: [] as any[],
    activePostId: null as string | null
  });

  const {
    formState,
    handleChange,
    handleFieldChange,
    handleBodySizeChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    missingFields,
    updateMissingFields,
    handleSubmit,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory,
    checkIsWriting,
    handleTemporarySave,
    fetchUnsavedPosts,
    handleContinuePost,
    handleDiscardPost,
    setInitialFormState,
    handleUpdate,
    tempSaveState,
    setTempSaveState
  } = useFormHandlers();

  const isWritingRef = useRef(false);
  const hasAlertShown = useRef(false);
  const navigationBlocked = useRef(false);
  const popStateTriggered = useRef(false);
  const checkIsWritingRef = useRef(checkIsWriting);

  useEffect(() => {
    checkIsWritingRef.current = checkIsWriting;
  }, [checkIsWriting]);

  useEffect(() => {
    const isCurrentlyWriting = checkIsWritingRef.current();
    isWritingRef.current = isCurrentlyWriting;
    setState((prev) => ({ ...prev, isWriting: isCurrentlyWriting }));
  }, [formState]); // 필요한 값만 의존성 배열에 추가

  useEffect(() => {
    if (!currentUser?.id || hasAlertShown.current) return;

    hasAlertShown.current = true; // 실행 전에 플래그 설정

    const checkUnsavedPosts = async () => {
      try {
        const posts = await fetchUnsavedPosts(currentUser.id);
        if (!posts.length) return;

        // unsavedPosts와 모달 오픈 상태를 업데이트
        setState((prev) => ({
          ...prev,
          unsavedPosts: posts,
          isContinueModalOpen: true
        }));
      } finally {
        hasAlertShown.current = true;
      }
    };

    checkUnsavedPosts();
  }, [currentUser?.id, fetchUnsavedPosts]);

  // 모달 "이어쓰기" 버튼 클릭 시 실행될 핸들러
  const onContinueModalConfirm = async () => {
    const latestPost = state.unsavedPosts[0];
    if (!latestPost) return;
    await handleContinuePost(latestPost);
    setState((prev) => ({
      ...prev,
      activePostId: latestPost.id,
      isWriting: true,
      isContinueModalOpen: false
    }));
  };

  // 모달 "새 게시물 작성하기" 버튼 클릭 시 실행될 핸들러
  const onContinueModalCancel = async () => {
    const latestPost = state.unsavedPosts[0];
    if (!latestPost) return;
    await handleDiscardPost(latestPost.id);
    setState((prev) => ({
      ...prev,
      isWriting: false,
      unsavedPosts: prev.unsavedPosts.filter((p) => p.id !== latestPost.id),
      isContinueModalOpen: false
    }));
  };

  return {
    state,
    setState,
    formState,
    handleChange,
    handleFieldChange,
    handleBodySizeChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    missingFields,
    updateMissingFields,
    handleSubmit,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory,
    checkIsWriting,
    handleTemporarySave,
    fetchUnsavedPosts,
    handleContinuePost,
    handleDiscardPost,
    setInitialFormState,
    handleUpdate,
    tempSaveState,
    setTempSaveState,
    isWritingRef,
    navigationBlocked,
    popStateTriggered,
    onContinueModalConfirm, // 모달 "이어쓰기" 핸들러 추가
    onContinueModalCancel // 모달 "새 게시물 작성하기" 핸들러 추가
  };
};
