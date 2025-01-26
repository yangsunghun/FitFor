"use client";

import { Database } from "@/lib/types/supabase";
import { useState } from "react";

// Form 상태 타입 정의
type FormState = {
  address: string;
  content: string;
  body_size: number[];
  images: string[];
  tags: string[];
  purchases: Database["public"]["Tables"]["purchase"]["Insert"][];
  isModalOpen: boolean;
  isPurchaseModalOpen: boolean;
  isSaveModalOpen: boolean;
  isContinued: boolean;
  productToEdit: Database["public"]["Tables"]["purchase"]["Insert"] | null;
  thumbnail_blur_url: string;
  postId: string; // 이어작성 게시글 ID (추가)
};

export type PostWithPurchases = Database["public"]["Tables"]["posts"]["Row"] & {
  purchases: Database["public"]["Tables"]["purchase"]["Row"][];
};

export type UseFormStateHandlersReturn = {
  formState: FormState;
  setInitialFormState: (data: PostWithPurchases) => Promise<void>;
  handleChange: <T extends keyof FormState>(key: T, value: FormState[T]) => void;
  handleBodySizeChange: (index: number, value: string) => void;
};

export const useFormStateHandlers = () => {
  // 폼 상태 초기화
  const [formState, setFormState] = useState<FormState>({
    address: "",
    content: "",
    body_size: [], // 키와 몸무게를 빈 배열로 초기화
    images: [], // 추가 이미지 배열
    tags: [],
    purchases: [],
    isModalOpen: false, // 주소 검색 모달 상태
    isPurchaseModalOpen: false, // 상품 추가 모달 상태
    isSaveModalOpen: false,
    isContinued: false,
    productToEdit: null, // 수정할 상품 데이터
    thumbnail_blur_url: "",
    postId: "" // 이어작성 게시글 ID 초기값
  });

  const setInitialFormState = async (data: PostWithPurchases) => {
    try {
      setFormState({
        address: data.upload_place || "",
        content: data.content || "",
        body_size: data.body_size || [],
        images: data.images || [],
        tags: data.tags || [],
        purchases: data.purchases || [], // purchases 포함
        isModalOpen: false,
        isPurchaseModalOpen: false,
        isSaveModalOpen: false,
        isContinued: false,
        productToEdit: null,
        thumbnail_blur_url: data.thumbnail_blur_url || "",
        postId: data.id || "" // 이어작성 게시글 ID 설정
      });
    } catch (error) {
      console.error("Error initializing form state:", error);
    }
  };

  // 폼 상태 변경 핸들러
  function handleChange<K extends keyof FormState>(
    key: K,
    value: FormState[K] | ((prev: FormState[K]) => FormState[K])
  ) {
    setFormState((prev) => ({
      ...prev,
      [key]: typeof value === "function" 
        ? (value as (prev: FormState[K]) => FormState[K])(prev[key]) 
        : value,
    }));
  }

  // 키와 몸무게 변경 핸들러
  const handleBodySizeChange = (index: number, value: string) => {
    setFormState((prevState) => {
      const updatedBodySize = [...prevState.body_size];
      updatedBodySize[index] = parseFloat(value) || 0; // 숫자로 변환
      return {
        ...prevState,
        body_size: updatedBodySize
      };
    });
  };

  return { formState, setInitialFormState, handleChange, handleBodySizeChange };
};
