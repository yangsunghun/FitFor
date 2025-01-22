"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useFormHandlers } from "@/lib/hooks/write/useFormHanlders";
import { useEditPostQuery } from "@/lib/hooks/write/usePostQueries";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import TagSection from "@/components/shared/TagSection";
import AddressModal from "../_components/AddressModal";
import BodySizeSection from "../_components/BodySizeSection";
import ContentSection from "../_components/ContentSection";
import ImageUploadSection from "../_components/ImageUploadSection";
import LocationSection from "../_components/LocationSection";
import ProductSection from "../_components/ProductSection";
import PurchaseModal from "../_components/PurchaseModal";

type EditPageProps = {
  params: {
    id: string; // 명시적으로 string 타입을 선언
  };
};

const EditPage = ({ params: { id } }: EditPageProps) => {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기

  // 폼 상태 및 핸들러 초기화
  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    toggleTagSelector,
    handleUpdate,
    handleChangeCategory,
    selectedCategory,
    setInitialFormState = () => {}
  } = useFormHandlers();

  const { data: fetchedData, isPending, isError } = useEditPostQuery(id);

  // 폼 초기화 플래그 관리
  const isFormInitialized = useRef(false);

  // 데이터 변경 시 폼 초기화 및 접근 권한 확인
  useEffect(() => {
    if (fetchedData && !isFormInitialized.current) {
      // 게시물 작성자와 현재 사용자가 다르면 접근 차단
      if (!currentUser || fetchedData.post.user_id !== currentUser.id) {
        alert("접근 권한이 없습니다.");
        router.push("/");
        return;
      }
      // 기존 데이터를 폼 상태에 반영
      setInitialFormState({
        ...fetchedData.post,
        purchases: fetchedData.purchases
      });
      isFormInitialized.current = true; // 초기화 플래그 설정
    }
  }, [fetchedData, setInitialFormState, currentUser, router]);

  // 로딩 상태 처리
  if (isPending) return <LoadingSpinner />;
  if (isError) return <p>게시물을 불러오는 데 문제가 발생했습니다.</p>;

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-10">
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">게시물 수정하기</h1>
      </div>

      <div className="rounded-2xl border border-line-02 bg-bg-01 px-8 py-9">
        <ContentSection content={formState.content} onChange={(value) => handleChange("content", value)} />

        <ImageUploadSection
          images={formState.images}
          blur={formState.thumbnail_blur_url}
          setImages={(images) => handleChange("images", images)}
          setBlur={(blurUrl) => handleChange("thumbnail_blur_url", blurUrl)}
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
        <button
          onClick={() => router.push(`/detail/${id}`)}
          className="rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body font-medium text-primary-default"
        >
          뒤로 가기
        </button>
        <button
          onClick={() => handleUpdate(id)}
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