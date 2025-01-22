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
  isSaveModalOpen: boolean;
  isContinued: boolean;
  productToEdit: Database["public"]["Tables"]["purchase"]["Insert"] | null;
  thumbnail_blur_url: string;
  postId: string; // 이어작성 게시글 ID (추가)
};

export type PostWithPurchases = Database["public"]["Tables"]["posts"]["Row"] & {
  purchases: Database["public"]["Tables"]["purchase"]["Row"][];
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
        postId: data.id || "", // 이어작성 게시글 ID 설정
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
  const [unsavedPosts, setUnsavedPosts] = useState<PostWithPurchases[]>([]);
  const [activePostId, setActivePostId] = useState<string | null>(null); // 현재 작성 중인 Post ID

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
        is_saved: false, // 최종 저장이
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

  //업데이트 핸들러
  const handleUpdate = async (id: string) => {
    const { content, address, body_size, images, tags, purchases } = formState;

    try {
      const updatedPost = {
        content,
        upload_place: address,
        body_size,
        images,
        tags
      };

      // 게시물 업데이트
      const { error: postError } = await supabase.from("posts").update(updatedPost).eq("id", id);
      if (postError) throw postError;

      // 기존 구매 데이터 삭제
      const { error: deleteError } = await supabase.from("purchase").delete().eq("post_id", id);
      if (deleteError) throw deleteError;

      // 새 구매 데이터 삽입
      if (purchases.length > 0) {
        const purchaseData = purchases.map((purchase) => ({
          ...purchase,
          post_id: id
        }));

        const { error: purchaseError } = await supabase.from("purchase").insert(purchaseData);
        if (purchaseError) throw purchaseError;
      }

      alert("수정 성공!");
      router.push(`/detail/${id}`);
    } catch (error) {
      console.error("게시물 수정 실패:", error);
      alert("수정 실패");
    }
  };

  // 임시 저장 게시글 가져오기 함수 (공용)
  const fetchUnsavedPosts = async (
    userId: string
  ): Promise<PostWithPurchases[]> => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", userId)
        .eq("is_saved", true);
  
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
        purchases: purchasesData?.filter((purchase) => purchase.post_id === post.id) || [],
      }));
    } catch (error) {
      console.error("임시 저장된 게시물 가져오기 중 오류:", error);
      return [];
    }
  };

// 이어서 작성 핸들러
const handleContinuePost = async (post: PostWithPurchases) => {
  try {
    // 폼 상태 초기화
    await setInitialFormState(post);

    // 이어작성 상태 설정
    handleChange("isContinued", true); // 이어작성 활성화
    handleChange("postId", post.id); // 이어작성할 게시글 ID 설정

    // 모달 상태와 동기화
    setActivePostId(post.id); // 현재 작성 중인 Post ID 업데이트

    alert("이어 작성할 게시물이 불러와졌습니다.");
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    alert("게시물 불러오기 중 오류가 발생했습니다.");
  }
};

  // 임시저장 삭제 핸들러
  const handleDiscardPost = async (postId: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
  
      alert("임시 저장된 게시물이 삭제되었습니다.");
  
      // 삭제 후 리스트 갱신
      const posts = await fetchUnsavedPosts(currentUser?.id || "");
      setUnsavedPosts(posts);
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
      alert("게시물 삭제 중 오류가 발생했습니다.");
    }
  };

// 임시 저장 핸들러 (기존 게시물 업데이트 및 새로운 게시물 생성)
const handleTemporarySave = async () => {
  const { content, address, body_size, images, tags, purchases, thumbnail_blur_url, isContinued, postId } = formState;

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!currentUser?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (isContinued && postId) {
        // 이어작성: 기존 게시글 업데이트
        const updatedPost = {
          content,
          upload_place: address,
          body_size,
          images,
          tags,
          thumbnail_blur_url,
          is_saved: true,
        };

        const { error: updateError } = await supabase
          .from("posts")
          .update(updatedPost)
          .eq("id", postId);
        if (updateError) throw updateError;
      } else {
        // 새 게시글 생성
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
          view: 0,
        };

        const { data: postData, error: insertError } = await supabase
          .from("posts")
          .insert([newPost])
          .select();
        if (insertError) throw insertError;

        handleChange("postId", postData[0].id); // 새 게시글 ID 저장
      }

      // 상품 데이터 저장
      const purchaseData = purchases.map((purchase) => ({
        ...purchase,
        post_id: postId || formState.postId, // 새 게시글 또는 이어작성 ID 사용
      }));

      const { error: purchaseError } = await supabase
        .from("purchase")
        .upsert(purchaseData);
      if (purchaseError) throw purchaseError;

      alert("임시 저장 완료!");
    } catch (error) {
      console.error("임시 저장 실패:", error);
      alert("임시 저장 실패");
    }
  };

  // 토글선택 핸들러
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
    handleUpdate,
    handleContinuePost,
    handleDiscardPost,
    fetchUnsavedPosts,
    handleTemporarySave,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory,
    setInitialFormState
  };
};