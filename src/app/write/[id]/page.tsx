"use client";

import { useRouter } from "next/navigation";
import { useFormHandlers } from "@/lib/hooks/write/useFormHanlders";
import { useEditPostQuery, useUpdatePostMutation } from "@/lib/hooks/write/usePostQueries";
import AddressModal from "../_components/AddressModal";
import BodySizeSection from "../_components/BodySizeSection";
import ContentSection from "../_components/ContentSection";
import ImageUploadSection from "../_components/ImageUploadSection";
import LocationSection from "../_components/LocationSection";
import ProductSection from "../_components/ProductSection";
import PurchaseModal from "../_components/PurchaseModal";
import TagSection from "../../../components/shared/TagSection";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRef, useEffect } from "react";

type EditPageProps = {
  params: {
    id: string; // 명시적으로 string 타입을 선언
  };
};

const EditPage = ({ params: { id } }: EditPageProps) => {
  const router = useRouter();

  // 폼 상태 및 핸들러 초기화
  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    toggleTagSelector,
    handleChangeCategory,
    tags,
    selectedCategory,
    setInitialFormState = () => {},
  } = useFormHandlers();

  const { data: fetchedData, isPending, isError } = useEditPostQuery(id);

  // 한 번만 실행되도록 플래그 관리
  const isFormInitialized = useRef(false);

  useEffect(() => {
    if (fetchedData && !isFormInitialized.current) {
      // 데이터가 있고, 아직 폼 초기화가 되지 않은 경우에만 실행
      setInitialFormState({
        ...fetchedData.post,
        purchases: fetchedData.purchases,
      });
      isFormInitialized.current = true; // 초기화 플래그 설정
    }
  }, [fetchedData, setInitialFormState]);

  // 게시물 수정 뮤테이션
  const mutation = useUpdatePostMutation(id, formState, {
    onSuccess: () => {
      alert("수정 성공!");
      router.push(`/detail/${id}`);
    },
    onError: (error) => {
      console.error("게시물 수정 실패:", error);
      alert("수정 실패");
    },
  });
  // 수정 완료 버튼 핸들러
  const handleUpdate = () => {
    mutation.mutate();
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <p>게시물을 불러오는 데 문제가 발생했습니다.</p>;

  return (
    <div className="mx-auto max-w-[700px] pt-10 pb-20">
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">게시물 수정하기</h1>
      </div>

      <div className="rounded-2xl border border-line-02 bg-bg-01 px-8 py-9">
        <ContentSection content={formState.content} onChange={(value) => handleChange("content", value)} />

        <ImageUploadSection
          images={formState.images}
          setImages={(images) => handleChange("images", images)}
          blur={formState.thumbnail_blur_url}
          setBlur={(blurUrl) => handleChange("thumbnail_blur_url", blurUrl)}
        />

        <LocationSection
          address={formState.address}
          onOpenModal={() => handleChange("isModalOpen", true)}
        />

        <BodySizeSection
          bodySize={formState.body_size}
          onChange={handleBodySizeChange}
        />

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
          tags={tags}
          selectedCategory={selectedCategory}
          onChangeCategory={handleChangeCategory}
          toggleTagSelector={toggleTagSelector}
        />
      </div>

      <div className="flex justify-center gap-6 pt-20">
        <button
          onClick={() => router.push(`/detail/${id}`)}
          className="rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body font-medium text-primary-default"
        >
          뒤로 가기
        </button>
        <button
          onClick={handleUpdate}
          className="rounded-lg bg-primary-default px-8 py-4 text-body font-medium text-bg-01"
        >
          수정 완료
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

export default EditPage;
