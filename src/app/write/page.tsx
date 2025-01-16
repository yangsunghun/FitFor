'use client';

import { Button } from '@/components/ui/Button';
import { TAG_GROUPS } from "@/lib/constants/constants";
import { useAuthStore } from "@/lib/store/authStore";
import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { MagnifyingGlass, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddressModal from "./_components/AddressModal";
import ImageUpload from "./_components/ImageUpload";
import PurchaseModal from "./_components/PurchaseModal";

const supabase = createClient();
const genUniqueId = () => {
  return crypto.randomUUID(); // 고유 ID 생성
};

type FormState = {
  address: string;
  content: string;
  body_size: number[];
  images: string[]; // 추가 이미지 배열
  tags: string[];
  purchases: Database["public"]["Tables"]["purchase"]["Insert"][];
  isModalOpen: boolean; // 추가
  isPurchaseModalOpen: boolean; // 추가
  productToEdit: Database["public"]["Tables"]["purchase"]["Insert"] | null; // 추가
};

const WritePage = () => {
  // 폼 상태 관리
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
  });

  const router = useRouter(); // 페이지 이동 관리
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기

  // 폼 상태 변경 핸들러
  const handleChange = <T extends keyof FormState>(
    key: T,
    value: FormState[T]
  ) => {
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

  // 태그 선택 핸들러
  const toggleTag = (tag: string, groupTags: string[], max: number) => {
    setFormState((prevState) => {
      const selectedGroupTags = prevState.tags.filter((t) =>
        groupTags.includes(t)
      );
      if (selectedGroupTags.includes(tag)) {
        // 선택된 태그 제거
        return {
          ...prevState,
          tags: prevState.tags.filter((t) => t !== tag),
        };
      } else if (selectedGroupTags.length < max) {
        // 제한 이내일 경우 태그 추가
        return { ...prevState, tags: [...prevState.tags, tag] };
      } else {
        alert(`최대 ${max}개의 태그만 선택 가능합니다.`);
        return prevState;
      }
    });
  };

  // 키와 몸무게 변경 핸들러
  const handleBodySizeChange = (index: number, value: string) => {
    setFormState((prevState) => {
      const updatedBodySize = [...prevState.body_size];
      updatedBodySize[index] = parseFloat(value) || 0; // 숫자로 변환

      return {
        ...prevState,
        body_size: updatedBodySize,
      };
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    const { content, address, body_size, images, tags, purchases } =
      formState;

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
        comments: 0,
        likes: 0,
        view: 0,
      };

      // 게시글 저장
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert([post])
        .select();

      if (postError) throw postError;

      const postId = postData[0].id; // 저장된 게시글 ID

      // 상품 데이터 저장
      if (purchases.length > 0) {
        const purchaseData = purchases.map((purchase) => ({
          ...purchase,
          post_id: postId,
        }));

        const { error: purchaseError } = await supabase
          .from("purchase")
          .insert(purchaseData);

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

  return (
    <div className="max-w-[700px] pt-10 space-y-10 mx-auto">
      {/* 페이지 제목 */}
      <div className="space-y-2">
        <h1 className="text-title1 font-bold text-text-04 leading-[150%]">
          게시물 작성하기
        </h1>
        <p className="text-title2 font-medium text-text-03">
          나만의 룩이나 소개하고 싶은 옷을 공유해보세요!
        </p>
      </div>

      {/* 작성 폼 */}
      <div className="py-9 px-8 bg-bg-01 border border-line-02 rounded-2xl space-y-10">
        {/* 본문 입력 섹션 */}
        <div className="space-y-2">
          {/* 제목 */}
          <div className="flex items-center gap-1">
            <span className="text-title2 font-bold text-text-04">본문</span>
            <span className="text-title2 font-bold text-primary-default">*</span>
          </div>
          {/* 본문 텍스트 입력 */}
          <textarea
            value={formState.content}
            onChange={(e) => {
              handleChange("content", e.target.value); // formState.content 업데이트
              e.target.style.height = "auto"; // 기존 높이 초기화
              e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 따라 높이 조정
            }}
            rows={6}
            className="w-full h-38 p-4 bg-bg-02 rounded-lg text-body text-text-02 font-medium placeholder-text-02 resize-none"
            placeholder="예시 - 소개팅 가야하는데 도와주세요"
          />
        </div>

        {/* 이미지 업로드 섹션 */}
        <div className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-title2 font-bold text-text-04">
                게시물 이미지
              </span>
              <span className="text-title2 font-bold text-primary-default">*</span>
            </div>
            {/* 설명 */}
            <p className="text-caption text-text-03 font-medium">
              다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
              <br />
              추천 사이즈 : OOO x OOO / OOO x OOO
            </p>
          </div>
          {/* 이미지 업로드 및 기본 정보 입력 */}
          <div className="flex flex-col gap-8">
            <div className="w-full">
              <ImageUpload
                images={formState.images}
                setImages={(images) => handleChange("images", images)}
              />
            </div>
          </div>

          {/* 위치 찾기 섹션 */}
          <div className="space-y-4">
            {/* 제목 */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className="text-title2 font-bold text-text-04">위치 찾기</span>
                <span className="text-title2 font-bold text-primary-default">*</span>
              </div>
              {/* 위치 입력 필드 */}
              <div className="h-14 p-4 bg-bg-02 rounded-lg flex items-center">
                <MagnifyingGlass size={24} className="text-text-03" />
                <input
                  type="text"
                  value={formState.address}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-lg text-text-03 bg-transparent placeholder:text-text-03"
                  placeholder="주소를 입력해주세요."
                />
              </div>
            </div>
            {/* 검색 버튼 */}
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleChange("isModalOpen", true)}
              className="w-full text-[18px]"
            >
              검색
            </Button>
          </div>

          {/* 키와 몸무게 입력 섹션 */}
          <div className="space-y-6">
            {/* 키 입력 */}
            <div className="space-y-2">
              <label className="text-title2 font-bold text-text-04">키</label>
              <div className="h-14 p-4 bg-bg-02 rounded-lg flex items-center justify-between">
                <input
                  value={formState.body_size[0] || ""}
                  onChange={(e) => handleBodySizeChange(0, e.target.value)}
                  className="bg-transparent w-full text-body font-medium outline-none"
                  placeholder="키를 입력해주세요."
                />
                <span className="text-text-02">cm</span>
              </div>
            </div>
            {/* 몸무게 입력 */}
            <div className="space-y-2">
              <label className="text-title2 font-bold text-text-04">몸무게</label>
              <div className="h-14 p-4 bg-bg-02 rounded-lg flex items-center justify-between">
                <input
                  value={formState.body_size[1] || ""}
                  onChange={(e) => handleBodySizeChange(1, e.target.value)}
                  className="bg-transparent w-full text-body font-medium outline-none"
                  placeholder="몸무게를 입력해주세요."
                />
                <span className="text-text-02">kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* 룩북 구성 상품 */}
        <div className="space-y-4 mt-8">
          {/* 제목 및 설명 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-title2 font-bold text-text-04">
                상품정보 입력
              </span>
              <span className="text-title2 font-bold text-primary-default">*</span>
            </div>
            <p className="text-caption text-text-03 font-medium">
              다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* 상품 추가 버튼 */}
            <button
              onClick={() => {
                if (formState.purchases.length >= 5) {
                  alert("상품은 최대 5개까지만 추가할 수 있습니다.");
                  return;
                }
                handleChange("productToEdit", null); // 추가 모드 초기화
                handleChange("isPurchaseModalOpen", true); // 추가 모달 열기
              }}
              className="w-32 h-32 flex flex-col items-center justify-center border border-line-02 rounded-lg text-text-03"
            >
              <UploadSimple size={24} />
            </button>

            {/* 추가된 상품 목록 */}
            {formState.purchases.map((purchase, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="relative w-32 h-32 border border-black rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    handleChange("productToEdit", purchase);
                    handleChange("isPurchaseModalOpen", true);
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePurchase(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10"
                    title="삭제"
                  >
                    X
                  </button>

                  {purchase.image_url ? (
                    <Image
                      src={purchase.image_url}
                      alt={purchase.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <p className="text-gray-400 text-sm">이미지 없음</p>
                    </div>
                  )}
                </div>
                <p className="text-sm font-bold text-center mt-2 truncate w-32">
                  {purchase.title || "상품 상세 정보"}
                </p>
              </div>
            ))}
          </div>

          {/* 태그 선택 */}
          <div className="mt-8">
            <label className="block mb-2 font-bold text-text-04">태그 선택하기</label>
            <p className="text-gray-600 mb-4 text-text-03">
              게시물에 어울리는 태그를 선택하세요.
            </p>
            {TAG_GROUPS.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="font-bold text-[18px] mb-2">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag, group.tags, group.max)}
                      className={`px-3 py-1 text-sm border rounded-full ${formState.tags.includes(tag)
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 섹션 */}
      <div className="flex justify-center gap-6">
        {/* 임시 저장 버튼 */}
        <button className="px-8 py-4 bg-bg-01 border border-primary-default text-primary-default text-body font-medium rounded-lg">
          임시 저장
        </button>
        {/* 게시물 만들기 버튼 */}
        <button
          onClick={handleSubmit}
          className="px-8 py-4 bg-primary-default text-bg-01 text-body font-medium rounded-lg"
        >
          게시물 만들기
        </button>
      </div>

      {/* 주소 검색 모달 */}
      <AddressModal
        isOpen={formState.isModalOpen}
        onClose={() => handleChange("isModalOpen", false)}
        onSelectAddress={(address) => handleChange("address", address)}
      />

      {/* 상품 추가 모달 */}
      <PurchaseModal
        isOpen={formState.isPurchaseModalOpen}
        onClose={() => {
          handleChange("productToEdit", null);
          handleChange("isPurchaseModalOpen", false);
        }}
        onAddProduct={handleAddPurchase}
        onEditProduct={handleEditPurchase}
        productToEdit={formState.productToEdit}
        mode={formState.productToEdit ? "edit" : "add"}
        purchasesLength={formState.purchases.length}
      />
    </div>
  );
};

export default WritePage;