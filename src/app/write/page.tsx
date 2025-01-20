"use client";

import TagSection from "@/components/shared/TagSection";
import { useFormHandlers } from "@/lib/hooks/write/useFormHanlders";
import AddressModal from "./_components/AddressModal";
import BodySizeSection from "./_components/BodySizeSection";
import ContentSection from "./_components/ContentSection";
import ImageUploadSection from "./_components/ImageUploadSection";
import LocationSection from "./_components/LocationSection";
import ProductSection from "./_components/ProductSection";
import PurchaseModal from "./_components/PurchaseModal";

const WritePage = () => {
  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    handleFinalSubmit,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory,
    imageFiles, // 상태 반환
    handleSetImageFiles // 핸들러 반환
  } = useFormHandlers();

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-10">
      {/* 어쩔수 없이 pb로 설정.. */}
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">게시물 작성하기</h1>
        <p className="text-title2 font-medium text-text-03">나만의 룩이나 소개하고 싶은 옷을 공유해보세요!</p>
      </div>

      <div className="rounded-2xl border border-line-02 bg-bg-01 px-8 py-9">
        <ContentSection content={formState.content} onChange={(value) => handleChange("content", value)} />

        {/* 이미지 업로드 섹션 */}

        <ImageUploadSection
          images={formState.images}
          blur={formState.thumbnail_blur_url}
          setImages={(images) => handleChange("images", images)}
          setBlur={(blurUrl) => handleChange("thumbnail_blur_url", blurUrl)}
          setImageFiles={handleSetImageFiles} // 파일 설정 핸들러 전달
        />

        <LocationSection address={formState.address} onOpenModal={() => handleChange("isModalOpen", true)} />

        <BodySizeSection bodySize={formState.body_size} onChange={handleBodySizeChange} />

        <ProductSection
          purchases={formState.purchases}
          onAdd={() => {
            if (formState.purchases.length >= 5) {
              alert("상품은 최대 5개까지만 추가할 수 있습니다.");
              return;
            }
            handleChange("productToEdit", null);
            handleChange("isPurchaseModalOpen", true);
          }}
          onEdit={(index) => {
            handleChange("productToEdit", formState.purchases[index]);
            handleChange("isPurchaseModalOpen", true);
          }}
          onDelete={handleDeletePurchase}
        />

        <TagSection
          title="게시물 주제를 선택해주세요."
          tags={formState.tags}
          selectedCategory={selectedCategory}
          onChangeCategory={handleChangeCategory}
          toggleTagSelector={toggleTagSelector}
        />
      </div>

      <div className="flex justify-center gap-6 pt-20">
        <button className="rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body font-medium text-primary-default">
          임시 저장
        </button>
        <button
          onClick={() =>
            handleFinalSubmit(imageFiles, (uploadedUrls) => handleChange("images", uploadedUrls))
          }
          className="rounded-lg bg-primary-default px-8 py-4 text-body font-medium text-bg-01"
        >
          게시물 만들기
        </button>
      </div>

      <AddressModal
        isOpen={formState.isModalOpen}
        onClose={() => handleChange("isModalOpen", false)}
        onSelectAddress={(address) => handleChange("address", address)}
      />

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
