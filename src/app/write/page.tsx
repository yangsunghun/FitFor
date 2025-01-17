'use client';

import { useFormHandlers } from '@/lib/hooks/write/useFormHanlders';
import AddressModal from './_components/AddressModal';
import PurchaseModal from './_components/PurchaseModal';
import ContentSection from './_components/ContentSection';
import LocationSection from './_components/LocationSection';
import BodySizeSection from './_components/BodySizeSection';
import ProductSection from './_components/ProductSection';
import TagSection from './_components/TagSection';
import ImageUploadSection from './_components/ImageUploadSection';

const WritePage = () => {
  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    handleSubmit,
    toggleTagSelector,
  } = useFormHandlers();

  return (
    <div className="max-w-[700px] pt-10 space-y-10 mx-auto">
      <div className="space-y-2">
        <h1 className="text-title1 font-bold text-text-04 leading-[150%]">
          게시물 작성하기
        </h1>
        <p className="text-title2 font-medium text-text-03">
          나만의 룩이나 소개하고 싶은 옷을 공유해보세요!
        </p>
      </div>

      <div className="py-9 px-8 bg-bg-01 border border-line-02 rounded-2xl">
      <ContentSection
        content={formState.content}
        onChange={(value) => handleChange('content', value)}
      />

      {/* 이미지 업로드 섹션 */}

        <ImageUploadSection
          images={formState.images}
          setImages={(images) => handleChange('images', images)}
        />


      <LocationSection
        address={formState.address}
        onOpenModal={() => handleChange('isModalOpen', true)}
      />

      <BodySizeSection
        bodySize={formState.body_size}
        onChange={handleBodySizeChange}
      />

      <ProductSection
        purchases={formState.purchases}
        onAdd={() => {
          if (formState.purchases.length >= 5) {
            alert('상품은 최대 5개까지만 추가할 수 있습니다.');
            return;
          }
          handleChange('productToEdit', null);
          handleChange('isPurchaseModalOpen', true);
        }}
        onEdit={(index) => {
          handleChange('productToEdit', formState.purchases[index]);
          handleChange('isPurchaseModalOpen', true);
        }}
        onDelete={handleDeletePurchase}
      />

      <TagSection
        tags={formState.tags}
        selectedCategory={formState.selectedCategory}
        onChangeCategory={(category) => handleChange('selectedCategory', category)}
        toggleTagSelector={toggleTagSelector}
      />
      </div>

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

      <AddressModal
        isOpen={formState.isModalOpen}
        onClose={() => handleChange('isModalOpen', false)}
        onSelectAddress={(address) => handleChange('address', address)}
      />

      <PurchaseModal
        isOpen={formState.isPurchaseModalOpen}
        onClose={() => {
          handleChange('productToEdit', null);
          handleChange('isPurchaseModalOpen', false);
        }}
        onAddProduct={handleAddPurchase}
        onEditProduct={handleEditPurchase}
        productToEdit={formState.productToEdit}
        mode={formState.productToEdit ? 'edit' : 'add'}
        purchasesLength={formState.purchases.length}
      />
    </div>
  );
};

export default WritePage;