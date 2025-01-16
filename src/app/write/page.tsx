'use client';

import { useAuthStore } from "@/lib/store/authStore";
import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddressModal from "./_components/AddressModal";
import PurchaseModal from "./_components/PurchaseModal";
import ThumbnailUpload from "./_components/ThumbnailUpload";

const supabase = createClient();
const genUniqueId = () => {
  return crypto.randomUUID(); // 고유 ID 생성
};

type FormState = {
  address: string;
  title: string;
  content: string;
  body_size: number[];
  thumbnail: string; // 단일 문자열
  images: string[]; // 추가 이미지 배열
  tags: string[];
  purchases: Database["public"]["Tables"]["purchase"]["Insert"][];
  isModalOpen: boolean; // 추가
  isPurchaseModalOpen: boolean; // 추가
  productToEdit: Database["public"]["Tables"]["purchase"]["Insert"] | null; // 추가
};

// 태그 그룹 정의
const TAG_GROUPS = [
  { title: "성별", tags: ["남성", "여성", "성별무관"], max: 1 },
  { title: "계절 (최대 2개)", tags: ["봄", "여름", "가을", "겨울"], max: 2 },
  { title: "스타일 태그 (최대 2개)", tags: ["캐주얼", "스트릿", "걸리시", "미니멀", "스포티", "시크", "시티보이", "로맨틱", "고프코어", "워크웨어", "레트로", "클래식", "프레피", "에스닉", "리조트", "드뮤어"], max: 2 },
  { title: "TPO (최대 2개)", tags: ["데일리", "데이트", "캠퍼스", "여행", "캠핑", "카페", "피크닉", "페스티벌", "바다", "러닝", "헬스", "등산", "요가", "소개팅", "출근", "결혼식", "면접", "상견례", "등교"], max: 2 },
];

const WritePage = () => {
  // 폼 상태 관리
  const [formState, setFormState] = useState<FormState>({
    address: "",
    title: "",
    content: "",
    body_size: [], // 키와 몸무게를 빈 배열로 초기화
    thumbnail: "", // 썸네일은 단일 문자열로 초기화
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
    const { title, content, address, body_size, thumbnail, images, tags, purchases } =
      formState;

    // 필수 입력 값 확인
    if (!title || !content || !address) {
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
        title,
        content,
        upload_place: address,
        created_at: new Date().toISOString(),
        user_id: currentUser.id,
        body_size,
        thumbnail,
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
          title: purchase.title,
          description: purchase.description,
          price: purchase.price,
          image_url: purchase.image_url
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
    <div className="relative bg-white min-h-screen p-10">
      <div className="w-full max-w-[1200px] mx-auto border border-gray-300 rounded-md shadow-lg p-8">
        {/* 상단 버튼 */}
        <div className="flex justify-end items-center mb-8 gap-6">
          <button className="w-28 h-12 px-6 py-2 border border-black rounded-lg">
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className="w-28 h-12 px-6 py-2 bg-black text-white rounded-lg"
          >
            완료
          </button>
        </div>

        <div className="w-full space-y-6">
          {/* 제목 입력 */}
          <div className="flex items-center border border-gray-300 rounded-lg p-4">
            {/* 왼쪽 아이콘 */}
            <div className="w-8 h-8 bg-yellow-500 rounded-lg m-4"></div>

            {/* 제목 (고정 텍스트) */}
            <div className="text-2xl font-bold text-black mr-4" style={{ fontSize: "36px" }}>
              Title
            </div>

            {/* 인풋 필드 */}
            <div className="flex-1">
              <input
                type="text"
                value={formState.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full border-none focus:outline-none text-gray-500 text-sm placeholder-gray-400"
                placeholder="Lorem ipsum dolor sit amet consectetur."
              />
            </div>
          </div>

          {/* 위치 입력 */}
          <div>
            <label className="block mb-2 font-bold text-[24px]">위치 입력</label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={formState.address}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                placeholder="검색 버튼을 눌러 주소를 입력해주세요."
              />
              <button
                onClick={() => handleChange("isModalOpen", true)}
                className="px-6 py-2 bg-black text-white rounded-lg text-[18px]"
              >
                검색
              </button>
            </div>
          </div>

          {/* 썸네일 업로드 및 기본 정보 입력 */}
          <div className="flex flex-col gap-8">
            <div className="w-full">
              <ThumbnailUpload
                thumbnail={formState.thumbnail}
                images={formState.images}
                setThumbnail={(thumbnail) => handleChange("thumbnail", thumbnail)}
                setImages={(images) => handleChange("images", images)}
                onThumbnailUpload={(url: string) => console.log("Thumbnail Uploaded:", url)}
              />
            </div>

            {/* 룩북 구성 상품 */}
            <div className="mt-8">
              <label className="block mb-2 font-bold text-[24px]">
                룩북 구성 상품
              </label>
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
                  className="w-32 h-32 flex flex-col items-center justify-center border border-gray-300 rounded-lg text-gray-500"
                >
                  <span className="text-2xl font-bold">+</span>
                  <span className="text-sm text-gray-500 mt-1">
                    {formState.purchases.length}/5
                  </span>
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
            </div>

            {/* 본문 입력 */}
            <div className="mt-8">
              <label className="block mb-2 font-bold text-[24px]">본문</label>
              <textarea
                value={formState.content}
                onChange={(e) => {
                  handleChange("content", e.target.value); // formState.content 업데이트
                  e.target.style.height = "auto"; // 기존 높이 초기화
                  e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 따라 높이 조정
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg overflow-hidden resize-none"
                rows={6}
                placeholder="본문 내용을 입력하세요."
              />
            </div>

            {/* 체형 입력 */}
            <div>
              <label className="block mb-4 font-bold text-[24px]">체형</label>
              <div className="flex flex-col gap-6">
                {/* 키 입력 */}
                <div>
                  <label className="block mb-2 text-black font-medium text-[18px]">키</label>
                  <div className="relative">
                    <input
                      value={formState.body_size[0] || ""}
                      onChange={(e) => handleBodySizeChange(0, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
                      cm
                    </span>
                  </div>
                </div>

                {/* 몸무게 입력 */}
                <div>
                  <label className="block mb-2 text-black font-medium text-[18px]">몸무게</label>
                  <div className="relative">
                    <input
                      value={formState.body_size[1] || ""}
                      onChange={(e) => handleBodySizeChange(1, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
                      kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 태그 선택 */}
          <div className="mt-8">
            <label className="block mb-2 font-bold text-[24px]">태그 선택하기</label>
            <p className="text-sm text-gray-600 mb-4">
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