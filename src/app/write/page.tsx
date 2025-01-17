'use client';

import { Button } from '@/components/ui/Button';
import { Tags } from '@/components/ui/Tags';
import { TAG_GROUPS } from "@/lib/constants/constants";
import { useFormHandlers } from '@/lib/hooks/write/useFormHanlders';
import { MagnifyingGlass, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import AddressModal from "./_components/AddressModal";
import ImageUpload from "./_components/ImageUpload";
import PurchaseModal from "./_components/PurchaseModal";

const WritePage = () => {
  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    handleSubmit,
    toggleTagSelector
  } = useFormHandlers();

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
      <div className="py-9 px-8 bg-bg-01 border border-line-02 rounded-2xl">
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
            className="w-full h-38 p-4 bg-bg-02 rounded-lg text-body font-medium placeholder-text-02 resize-none"
            placeholder="예시 - 소개팅 가야하는데 도와주세요"
          />
        </div>

        {/* 이미지 업로드 섹션 */}
        <div className="pt-10 space-y-6">
          <ImageUpload
            images={formState.images}
            setImages={(images) => handleChange("images", images)}
          />
        </div>

        {/* 위치 찾기 섹션 */}
        <div className="space-y-4 pt-10">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-title2 font-bold text-text-04">위치 찾기</span>
              <span className="text-title2 font-bold text-primary-default">*</span>
            </div>
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
        <div className="space-y-6 pt-10">
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

        {/* 룩북 구성 상품 */}
        <div className="space-y-6 pt-10">
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
            <button
              onClick={() => {
                if (formState.purchases.length >= 5) {
                  alert("상품은 최대 5개까지만 추가할 수 있습니다.");
                  return;
                }
                handleChange("productToEdit", null);
                handleChange("isPurchaseModalOpen", true);
              }}
              className="w-32 h-32 flex flex-col items-center justify-center border border-line-02 rounded-lg text-text-03"
            >
              <UploadSimple size={24} />
            </button>
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

        {/* 태그 선택 */}
        <div className="space-y-2 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-title2 font-bold text-text-04">
                게시물 주제를 선택해주세요.
              </span>
              <span className="text-title2 font-bold text-primary-default">*</span>
            </div>
            {/* 선택된 태그 개수 */}
            <span className="text-sm text-body text-text-04">{formState.tags.length} / 7</span>
          </div>

          {/* 주제 선택 버튼 */}
          <div className="flex flex-wrap gap-2">
            {TAG_GROUPS.map((group) => (
              <button
                key={group.key}
                onClick={() => handleChange("selectedCategory", group.key)}
                className="focus:outline-none"
              >
                <Tags
                  label={group.title}
                  variant={
                    formState.selectedCategory === group.key ? "gray" : "grayLine"
                  }
                  size="md"
                />
              </button>
            ))}
          </div>

          {/* 선택된 카테고리의 태그 */}
          {formState.selectedCategory && (
            <div className="space-y-2">
              <p className="font-bold pt-10">태그</p>
              <div className="flex flex-wrap gap-2">
                {TAG_GROUPS.find(
                  (group) => group.key === formState.selectedCategory
                )?.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      toggleTagSelector(
                        tag,
                        TAG_GROUPS.find(
                          (group) => group.key === formState.selectedCategory
                        )?.tags || [],
                        TAG_GROUPS.find(
                          (group) => group.key === formState.selectedCategory
                        )?.max || 0
                      )
                    }
                    className="focus:outline-none"
                  >
                    <Tags
                      label={tag}
                      variant={
                        formState.tags.includes(tag) ? "gray" : "grayLine"
                      }
                      size="md"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 섹션 */}
      <div className="flex justify-center gap-6">
        <button className="px-8 py-4 bg-bg-01 border border-primary-default text-primary-default text-body font-medium rounded-lg">
          임시 저장
        </button>
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