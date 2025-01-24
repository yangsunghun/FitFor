"use client";

import { useFormStateHandlers } from "./useFormStateHandlers";
import { usePostHandlers } from "./usePostHandlers";
import { usePurchaseHandlers } from "./usePurchaseHandlers";
import { useTagHandlers } from "./useTagHandlers";
import { useTempSaveHandlers } from "./useTempSaveHandlers";

export const useFormHandlers = () => {
  // 개별 핸들러 모듈에서 함수와 상태를 가져와 통합
  const formStateHandlers = useFormStateHandlers();
  const purchaseHandlers = usePurchaseHandlers();
  const postHandlers = usePostHandlers();
  const categoryTagHandlers = useTagHandlers();
  const TempSaveHandlers = useTempSaveHandlers();

  return {
    // FormState 관련 핸들러
    formState: formStateHandlers.formState,
    handleChange: formStateHandlers.handleChange,
    handleBodySizeChange: formStateHandlers.handleBodySizeChange,
    setInitialFormState: formStateHandlers.setInitialFormState || (() => {}),

    // Purchase 관련 핸들러
    handleAddPurchase: purchaseHandlers.handleAddPurchase,
    handleEditPurchase: purchaseHandlers.handleEditPurchase,
    handleDeletePurchase: purchaseHandlers.handleDeletePurchase,

    // Post 관련 핸들러
    handleSubmit: postHandlers.handleSubmit,
    handleUpdate: postHandlers.handleUpdate,

    // Category & Tag 관련 핸들러
    toggleTagSelector: categoryTagHandlers.toggleTagSelector,
    handleChangeCategory: categoryTagHandlers.handleChangeCategory,
    selectedCategory: categoryTagHandlers.selectedCategory,

    // 임시저장 관련 핸들러
    handleContinuePost: TempSaveHandlers.handleContinuePost,
    handleDiscardPost: TempSaveHandlers.handleDiscardPost,
    handleTemporarySave: TempSaveHandlers.handleTemporarySave,
    fetchUnsavedPosts: TempSaveHandlers.fetchUnsavedPosts
  };
};
