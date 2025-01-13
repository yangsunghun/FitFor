'use client';

import { useAuthStore } from "@/lib/store/authStore";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddressModal from './_components/AddressModal';
import ThumbnailUpload from './_components/ThumbnailUpload';
import PurchaseModal from './_components/PurchaseModal'; // 추가

const supabase = createClient();

const WritePage = () => {
  // 상태 관리
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bodySize, setBodySize] = useState({ height: '', weight: '' });
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<string[]>([]); // 선택된 태그 상태
  const [products, setProducts] = useState<any[]>([]); // 상품정보 추가 리스트
  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 검색 모달 상태
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false); // 상품 모달 상태
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);

  // 상품 추가 함수
  const handleAddProduct = (product: { title: string; description: string; price: number; imageUrl: string }) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // 게시글 저장 함수
  const handleSubmit = async () => {
    // 필수 입력 항목 확인
    if (!title || !content || !address) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  
    // 로그인 상태 확인
    if (!currentUser || !currentUser.id) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      // 1. 게시글 저장
      const post = {
        title,
        content,
        upload_place: address,
        created_at: new Date().toISOString(),
        user_id: currentUser.id,
        body_size: [parseFloat(bodySize.height) || 0, parseFloat(bodySize.weight) || 0],
        thumbnail: thumbnail || '',
        tags,
        comments: 0,
        likes: 0,
        view: 0,
      };
  
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([post])
        .select(); // 게시글 ID를 반환받기 위해 select() 사용
  
      if (postError) throw postError;
  
      const postId = postData[0].id; // 새로 생성된 게시글 ID
  
      // 2. 상품 정보 저장
      if (products.length > 0) {
        const purchaseData = products.map((product) => ({
          post_id: postId,
          title: product.title,
          description: product.description,
          price: product.price,
          image_url: product.imageUrl,
        }));
  
        const { error: purchaseError } = await supabase
          .from('purchase')
          .insert(purchaseData);
  
        if (purchaseError) throw purchaseError;
      }
  
      alert('저장 성공!');
      router.push('/'); // 저장 후 메인 페이지로 이동
    } catch (error) {
      console.error('게시글 저장 실패:', error);
      alert('저장 실패');
    }
  };

  return (
    <div className="relative bg-white min-h-screen p-10">
      {/* 게시글 작성 컨테이너 */}
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
          {/* 썸네일 업로드 */}
          <div className="w-1/2">
            <ThumbnailUpload
              thumbnail={thumbnail}
              onThumbnailUpload={setThumbnail}
            />
          </div>

          {/* 기본 정보 입력 */}
          <div className="w-1/2 space-y-6">
            {/* 제목 입력 */}
            <div>
              <label className="block mb-2 font-bold text-[18px]">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  value={address}
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
                  value={bodySize.height}
                  onChange={(e) =>
                    setBodySize((prev) => ({ ...prev, height: e.target.value }))
                  }
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="키 (cm)"
                />
                <input
                  type="number"
                  value={bodySize.weight}
                  onChange={(e) =>
                    setBodySize((prev) => ({ ...prev, weight: e.target.value }))
                  }
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
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = 'auto'; // 기존 높이 초기화
              e.target.style.height = `${e.target.scrollHeight}px`; // scrollHeight 기반 높이 설정
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg overflow-hidden resize-none"
            rows={6}
            placeholder="본문 내용을 입력하세요."
          />
        </div>

        {/* 상품정보 추가 */}
        <div className="mt-8">
          <label className="block mb-2 font-bold text-[24px]">룩북 구성 상품</label>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="w-32 h-32 flex items-center justify-center border border-gray-300 rounded-lg text-gray-500"
            >
              + 추가
            </button>
            {products.map((product, index) => (
              <div
                key={index}
                className="w-32 h-32 flex items-center justify-center border border-black rounded-lg text-black"
              >
                {product.title}
              </div>
            ))}
          </div>
        </div>

        {/* 태그 선택 */}
        <div className="mt-8">
        <label className="block mb-2 font-bold text-[24px]">태그 선택하기</label>
        <p className="text-sm text-gray-600 mb-4">게시물에 어울리는 내용을 태그해 보세요.</p>
          {[
            { title: '성별', tags: ['남성', '여성', '유니섹스'], max: 1 },
            { title: '계절 (최대 2개)', tags: ['봄', '여름', '가을', '겨울'], max: 2 },
            { title: '스타일 태그 (최대 2개)', tags: ['캐주얼', '스트릿', '걸리시', '미니멀', '스포티', '시크', '시티보이', '로맨틱', '고프코어', '워크웨어', '레트로', '클래식', '프레피', '에스닉', '리조트', '드뮤어'], max: 2 },
            { title: 'TPO (최대 2개)', tags: ['데일리', '데이트', '캠퍼스', '여행', '캠핑', '카페', '피크닉', '페스티벌', '바다', '러닝', '헬스', '등산', '요가', '소개팅', '출근', '결혼식', '면접', '상견례', '등교'], max: 2 },
          ].map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <p className="font-bold text-[18px] mb-2">{group.title}</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setTags((prevTags) => {
                        const groupTags = prevTags.filter((t) => group.tags.includes(t)); // 현재 그룹에서 선택된 태그만 필터링
                        if (groupTags.includes(tag)) {
                          // 이미 선택된 태그를 클릭하면 제거
                          return prevTags.filter((t) => t !== tag);
                        } else if (groupTags.length < group.max) {
                          // 선택한 태그가 최대 제한보다 적을 때 추가
                          return [...prevTags, tag];
                        }
                        // 최대 선택 제한 초과 시 alert 표시
                        alert(`최대 ${group.max}개의 태그만 선택 가능합니다.`);
                        return prevTags;
                      });
                    }}
                    className={`px-3 py-1 text-sm border rounded-full ${
                      tags.includes(tag)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-300'
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
        onSelectAddress={setAddress}
      />

      {/* 상품 추가 모달 */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default WritePage;