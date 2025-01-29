import { useState, useEffect, useRef } from "react";
import { PostWithPurchases } from "@/lib/hooks/write/useFormStateHandlers";
import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";

export type UseWritePageStateReturn = ReturnType<typeof useWritePageState>;

export const useWritePageState = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [state, setState] = useState({
    isExitModalOpen: false,
    isWriting: false,
    pendingNavigation: null as string | null,
    unsavedPosts: [] as any[],
    activePostId: null as string | null,
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
    setTempSaveState,
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

    hasAlertShown.current = true; // ✅ 실행 전에 플래그 설정

    const checkUnsavedPosts = async () => {
      try {
        const posts = await fetchUnsavedPosts(currentUser.id);
        if (!posts.length) return;

        setState((prev) => ({ ...prev, unsavedPosts: posts }));
        const latestPost = posts[0];

        const shouldContinue = confirm(
          `${relativeTimeDay(latestPost.created_at)}에 작성한 글이 있습니다. 이어서 작성하시겠습니까?`
        );

        if (shouldContinue) {
          await handleContinuePost(latestPost);
          setState((prev) => ({
            ...prev,
            activePostId: latestPost.id,
            isWriting: true,
          }));
        } else {
          await handleDiscardPost(latestPost.id);
          setState((prev) => ({
            ...prev,
            isWriting: false,
            unsavedPosts: prev.unsavedPosts.filter((p) => p.id !== latestPost.id),
          }));
        }
      } finally {
        hasAlertShown.current = true;
      }
    };

    checkUnsavedPosts();
  }, [currentUser?.id, fetchUnsavedPosts, handleContinuePost, handleDiscardPost]);

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
  };
};