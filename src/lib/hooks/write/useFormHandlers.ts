"use client";

import { useFormStateHandlers } from "./useFormStateHandlers";
import { usePostHandlers } from "./usePostHandlers";
import { usePurchaseHandlers } from "./usePurchaseHandlers";
import { useTagHandlers } from "./useTagHandlers";
import { useTempSaveHandlers } from "./useTempSaveHandlers";


export const useFormHandlers = () => {
  // `useFormStateHandlers`에서 상태와 상태 변경 함수 가져오기
  const formStateHandlers = useFormStateHandlers();

  // `useTempSaveHandlers`에서 상태와 상태 변경 함수 가져오기
  const tempSaveHandlers = useTempSaveHandlers(formStateHandlers);

  // 각 핸들러에 필요한 속성 전달
  const purchaseHandlers = usePurchaseHandlers(formStateHandlers);
  const postHandlers = usePostHandlers({
    ...formStateHandlers,
    setTempSaveState: tempSaveHandlers.setTempSaveState, // TempSaveState로 맞춰 전달
  });
  const categoryTagHandlers = useTagHandlers(formStateHandlers);

  return {
    // FormState 관련 핸들러
    formState: formStateHandlers.formState,
    handleChange: formStateHandlers.handleChange,
    handleBodySizeChange: formStateHandlers.handleBodySizeChange,
    setInitialFormState: formStateHandlers.setInitialFormState,

    // Purchase 관련 핸들러
    handleAddPurchase: purchaseHandlers.handleAddPurchase,
    handleEditPurchase: purchaseHandlers.handleEditPurchase,
    handleDeletePurchase: purchaseHandlers.handleDeletePurchase,

    // Post 관련 핸들러
    missingFields: postHandlers.missingFields,
    updateMissingFields: postHandlers.updateMissingFields,
    handleSubmit: postHandlers.handleSubmit,
    handleUpdate: postHandlers.handleUpdate,

    // Category & Tag 관련 핸들러
    toggleTagSelector: categoryTagHandlers.toggleTagSelector,
    handleChangeCategory: categoryTagHandlers.handleChangeCategory,
    selectedCategory: categoryTagHandlers.selectedCategory,

    // 임시저장 관련 핸들러
    tempSaveState: tempSaveHandlers.tempSaveState,
    setTempSaveState: tempSaveHandlers.setTempSaveState,
    fetchUnsavedPosts: tempSaveHandlers.fetchUnsavedPosts,
    handleContinuePost: tempSaveHandlers.handleContinuePost,
    handleDiscardPost: tempSaveHandlers.handleDiscardPost,
    handleTemporarySave: tempSaveHandlers.handleTemporarySave,
    checkIsWriting: tempSaveHandlers.checkIsWriting,
    handleFieldChange: tempSaveHandlers.handleFieldChange
  };
};
