import TagSection from "@/components/shared/TagSection";
import type { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import AddressModal from "./AddressModal";
import BodySizeSection from "./BodySizeSection";
import ContentSection from "./ContentSection";
import ImageUploadSection from "./ImageUploadSection";
import LocationSection from "./LocationSection";
import ProductSection from "./ProductSection";
import PurchaseModal from "./PurchaseModal";

type PostFormProps = ReturnType<typeof useFormHandlers> & {
  mode?: "post" | "edit";
};

const PostForm = ({
  formState,
  handleChange,
  handleFieldChange,
  updateMissingFields,
  handleBodySizeChange,
  handleAddPurchase,
  handleEditPurchase,
  handleDeletePurchase,
  selectedCategory,
  handleChangeCategory,
  toggleTagSelector,
  missingFields,
}: PostFormProps) => (
  <div className="rounded-2xl border border-line-02 bg-bg-01 px-8 py-9">
    <ContentSection
      content={formState.content}
      onChange={(value) => {
        handleFieldChange("content", value);
        updateMissingFields("content", value); // 실시간 필드 상태 업데이트
      }}
      isMissing={missingFields.includes("content")} // 필수 입력 경고 전달
    />

    <ImageUploadSection
      images={formState.images}
      blur={formState.thumbnail_blur_url}
      setImages={(updateFn) => {
        const updatedImages = typeof updateFn === "function" ? updateFn(formState.images) : updateFn;
        handleFieldChange("images", updatedImages);
        updateMissingFields("images", updatedImages); // 실시간 필드 상태 업데이트
      }}
      setBlur={(blurUrl) => handleFieldChange("thumbnail_blur_url", blurUrl)}
      isMissing={missingFields.includes("images")} // 필수 입력 경고 전달
    />

    <LocationSection address={formState.address} onOpenModal={() => handleFieldChange("isModalOpen", true)} />

    <BodySizeSection bodySize={formState.body_size} onChange={handleBodySizeChange} />

    <ProductSection
      purchases={formState.purchases}
      onAdd={() => {
        if (formState.purchases.length >= 5) {
          alert("상품은 최대 5개까지만 추가할 수 있습니다.");
          return;
        }
        handleFieldChange("productToEdit", null);
        handleFieldChange("isPurchaseModalOpen", true);

        // 상품 추가로 인해 missingFields 업데이트
        updateMissingFields("purchases", [...formState.purchases, {}]); // 빈 객체로 추가된 상태를 가정
      }}
      onEdit={(index) => {
        handleFieldChange("productToEdit", formState.purchases[index]);
        handleFieldChange("isPurchaseModalOpen", true);
      }}
      onDelete={(index) => {
        const updatedPurchases = formState.purchases.filter((_, i) => i !== index);
        handleDeletePurchase(index);
        handleFieldChange("purchases", updatedPurchases);
        updateMissingFields("purchases", updatedPurchases); // 실시간 필드 상태 업데이트
      }}
      isMissing={missingFields.includes("purchases")} // 필수 입력 경고 전달
    />

    <TagSection
      title="게시물 주제를 선택해주세요."
      tags={formState.tags}
      selectedCategory={selectedCategory}
      onChangeCategory={handleChangeCategory}
      toggleTagSelector={toggleTagSelector}
      isRequired={false}
    />
    <AddressModal
      isOpen={formState.isModalOpen}
      onClose={() => handleFieldChange("isModalOpen", false)}
      onSelectAddress={(address) => handleFieldChange("address", address)}
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

export default PostForm;