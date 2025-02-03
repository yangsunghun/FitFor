"use client";

import { Database } from "@/lib/types/supabase";
import { MutableRefObject, useRef, useState } from "react";

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
  originalDataRef: MutableRefObject<Partial<FormState>>;
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

  // 원본 데이터를 저장할 ref
  const originalDataRef = useRef<Partial<FormState>>({});
  const setInitialFormState = async (data: PostWithPurchases) => {
    try {
      // 기존 데이터를 객체로 생성
      const initialData = {
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
      };

      // 원본 데이터를 ref에 저장 (여기서는 추가적인 필드 없이 initialData 자체를 저장)
      originalDataRef.current = { ...initialData };

      // 폼 상태 업데이트
      setFormState(initialData);
    } catch (error) {
      console.error("FormState Error:", error);
    }
  };

  // 폼 상태 변경 핸들러
  const handleChange = <T extends keyof FormState>(key: T, value: FormState[T]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

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

  return { formState, setInitialFormState, handleChange, handleBodySizeChange, originalDataRef };
};
