"use client";

import { Database } from "@/lib/types/supabase";
import { UseFormStateHandlersReturn } from "./useFormStateHandlers";

type UsePurchaseHandlersProps = Pick<UseFormStateHandlersReturn, "formState" | "handleChange">;

export const usePurchaseHandlers = ({ formState, handleChange }: UsePurchaseHandlersProps) => {
  const genUniqueId = () => crypto.randomUUID(); // 고유 ID 생성

  // 상품 추가 핸들러
  const handleAddPurchase = (purchase: Database["public"]["Tables"]["purchase"]["Insert"]) => {
    const newPurchase = { ...purchase, id: genUniqueId() }; // 고유 ID 생성
    handleChange("purchases", [...formState.purchases, newPurchase]);
  };

  // 상품 수정 핸들러
  const handleEditPurchase = (updatedProduct: Database["public"]["Tables"]["purchase"]["Insert"]) => {
    // 상품 목록 업데이트
    const updatedPurchases = formState.purchases.map((p) =>
      // 수정 요청된 상품의 ID, 기존 상품 ID 비교 - (일치하면 수정된 상품, 불일치시 기존상품 유지)
      p.id === updatedProduct.id ? { ...updatedProduct } : { ...p }
    );
    handleChange("purchases", updatedPurchases);
    handleChange("productToEdit", null); // 수정 모드 초기화
  };

  // 상품 삭제 핸들러
  const handleDeletePurchase = (indexToRemove: number) => {
    handleChange(
      "purchases",
      formState.purchases.filter((_, index) => index !== indexToRemove)
    );
  };

  return { handleAddPurchase, handleEditPurchase, handleDeletePurchase };
};
