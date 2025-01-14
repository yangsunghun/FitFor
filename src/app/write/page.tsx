'use client';

import { useAuthStore } from "@/lib/store/authStore";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddressModal from "./_components/AddressModal";
import PurchaseModal from "./_components/PurchaseModal";
import ThumbnailUpload from "./_components/ThumbnailUpload";

const supabase = createClient();

// 타입 정의
type PostInsert = {
  title: string;
  content: string;
  upload_place: string;
  created_at?: string;
  user_id: string;
  body_size: number[];
  thumbnail: string;
  tags: string[];
  comments: number;
  likes: number;
  view: number;
};

type PurchaseInsert = {
  title: string;
  description?: string | null;
  price?: number | null;
  image_url?: string | null;
  post_id?: string;
};

type FormState = {
  address: string;
  title: string;
  content: string;
  body_size: number[];
  thumbnail: string;
  tags: string[];
  purchases: PurchaseInsert[];
};

// 태그 그룹 정의
const TAG_GROUPS = [
  { title: "성별", tags: ["남성", "여성", "유니섹스"], max: 1 },
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
    thumbnail: "",
    tags: [],
    purchases: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 검색 모달 상태
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false); // 상품 추가 모달 상태

  const router = useRouter(); // 페이지 이동 관리
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기

  // 폼 상태 변경 핸들러
  const handleChange = <T extends keyof FormState>(
    key: T,
    value: FormState[T]
  ) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  // 상품 추가 핸들러
  const handleAddPurchase = (purchase: PurchaseInsert) => {
    handleChange("purchases", [...formState.purchases, purchase]);
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
    const { title, content, address, body_size, thumbnail, tags, purchases } =
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

    try {
      // 게시글 데이터 생성
      const post: PostInsert = {
        title,
        content,
        upload_place: address,
        created_at: new Date().toISOString(),
        user_id: currentUser.id,
        body_size: body_size,
        thumbnail,
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
        <div className="flex justify-between items-center mb-8">
          <button className="px-6 py-2 bg-gray-200 border border-gray-300 rounded-lg">
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            완료
          </button>
        </div>

        {/* 썸네일 업로드 및 기본 정보 입력 */}
        <div className="flex gap-8">
          <div className="w-1/2">
            <ThumbnailUpload
              thumbnail={formState.thumbnail}
              onThumbnailUpload={(url) => handleChange("thumbnail", url)}
            />
          </div>

          <div className="w-1/2 space-y-6">
            {/* 제목 입력 */}
            <div>
              <label className="block mb-2 font-bold text-[18px]">제목</label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="제목을 입력하세요."
              />
            </div>

            {/* 위치 입력 */}
            <div>
              <label className="block mb-2 font-bold text-[18px]">위치</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={formState.address}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  placeholder="검색 버튼을 눌러 주소를 입력해주세요."
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 bg-black text-white rounded-lg text-[18px]"
                >
                  검색
                </button>
              </div>
            </div>

            {/* 체형 입력 */}
            <div>
              <label className="block mb-2 font-bold text-[18px]">체형</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={formState.body_size[0] || ""}
                  onChange={(e) => handleBodySizeChange(0, e.target.value)}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="키 (cm)"
                />
                <input
                  type="number"
                  value={formState.body_size[1] || ""}
                  onChange={(e) => handleBodySizeChange(1, e.target.value)}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="몸무게 (kg)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 본문 입력 */}
        <div className="mt-8">
          <label className="block mb-2 font-bold text-[24px]">본문</label>
          <textarea
            value={formState.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
            rows={6}
            placeholder="본문 내용을 입력하세요."
          />
        </div>

        {/* 룩북 구성 상품 */}
        <div className="mt-8">
          <label className="block mb-2 font-bold text-[24px]">룩북 구성 상품</label>
          <div className="flex flex-wrap gap-4">
            {/* 상품 추가 버튼 */}
            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="w-32 h-32 flex items-center justify-center border border-gray-300 rounded-lg text-gray-500"
            >
              + 추가
            </button>

            {/* 추가된 상품 목록 */}
            {formState.purchases.map((purchase, index) => (
              <div
                key={index}
                className="w-32 h-32 flex flex-col items-center justify-center border border-black rounded-lg text-black p-2"
              >
                {/* 상품 이미지 */}
                {purchase.image_url && (
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    <Image
                      src={purchase.image_url}
                      alt={purchase.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                {/* 상품명 */}
                <p className="text-sm font-bold text-center">{purchase.title}</p>
              </div>
            ))}
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

      {/* 주소 검색 모달 */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAddress={(address) => handleChange("address", address)}
      />

      {/* 상품 추가 모달 */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)} // 모달 닫기
        onAddProduct={(purchase) => handleAddPurchase(purchase)} // 상품 추가 핸들러
      />
    </div>
  );
};

export default WritePage;