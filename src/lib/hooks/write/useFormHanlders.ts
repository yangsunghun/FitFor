"use client";

import { useAuthStore } from "@/lib/store/authStore";
import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();
const genUniqueId = () => crypto.randomUUID(); // 고유 ID 생성

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
  productToEdit: Database["public"]["Tables"]["purchase"]["Insert"] | null;
  thumbnail_blur_url: string | null;
};

export const useFormHandlers = () => {
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
    productToEdit: null, // 수정할 상품 데이터
    thumbnail_blur_url: null
  });

  type PostWithPurchases = Database["public"]["Tables"]["posts"]["Row"] & {
    purchases: Database["public"]["Tables"]["purchase"]["Row"][];
  };

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
        productToEdit: null,
        thumbnail_blur_url: data.thumbnail_blur_url || null
      });
    } catch (error) {
      console.error("Error initializing form state:", error);
    }
  };

  const router = useRouter(); // 페이지 이동 관리
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기
  // 태그 섹션 관련 상태
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // 카테고리 변경 핸들러
  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    setTags([]); // 카테고리 변경 시 태그 초기화
  };

  // 폼 상태 변경 핸들러
  const handleChange = <T extends keyof FormState>(key: T, value: FormState[T]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

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
    handleChange("purchases", [...updatedPurchases]);
    setFormState((prev) => ({ ...prev, productToEdit: null }));
  };

  // 상품 삭제 핸들러
  const handleDeletePurchase = (indexToRemove: number) => {
    handleChange(
      "purchases",
      formState.purchases.filter((_, index) => index !== indexToRemove)
    );
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

  const toggleTagSelector = (tag: string, groupTags: string[], max: number) => {
    setFormState((prevState) => {
      const selectedGroupTags = prevState.tags.filter((t) => groupTags.includes(t));

      // 전체 태그 수 제한 (최대 7개)
      if (!selectedGroupTags.includes(tag) && prevState.tags.length >= 7) {
        alert("최대 7개의 태그만 선택 가능합니다.");
        return prevState;
      }

      // 그룹별 태그 선택/해제
      if (selectedGroupTags.includes(tag)) {
        return {
          ...prevState,
          tags: prevState.tags.filter((t) => t !== tag)
        };
      } else if (selectedGroupTags.length < max) {
        return { ...prevState, tags: [...prevState.tags, tag] };
      } else {
        alert(`해당 주제는 최대 ${max}개의 태그만 선택 가능합니다.`);
        return prevState;
      }
    });
  };

  return {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    handleSubmit,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory,
    setInitialFormState
  };
};
