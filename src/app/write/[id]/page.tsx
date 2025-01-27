"use client";

import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ScrollTopButton from "@/components/shared/ScrollTopButton";
import TagSection from "@/components/shared/TagSection";
import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { useEditPostQuery } from "@/lib/hooks/write/usePostQueries";
import { useAuthStore } from "@/lib/store/authStore";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import AddressModal from "../_components/AddressModal";
import BodySizeSection from "../_components/BodySizeSection";
import ContentSection from "../_components/ContentSection";
import ImageUploadSection from "../_components/ImageUploadSection";
import LocationSection from "../_components/LocationSection";
import ProductSection from "../_components/ProductSection";
import PurchaseModal from "../_components/PurchaseModal";

const supabase = createClient();

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
    missingFields,
    updateMissingFields,
    handleUpdate,
    toggleTagSelector,
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

  // 새로고침/뒤로가기/페이지 이동 시 이미지 정리 로직 추가
  useEffect(() => {
    const cleanupImages = async () => {
      const allFilePaths: string[] = [];

      // 게시물 이미지 정리
      if (formState.images.length > 0) {
        const imageFilePaths = formState.images.map((url) => extractFilePath(url));
        allFilePaths.push(...imageFilePaths);
      }

      // 구매 정보 이미지 정리
      if (formState.purchases.length > 0) {
        const purchaseImagePaths = formState.purchases
          .filter((purchase) => purchase.image_url)
          .map((purchase) => extractFilePath(purchase.image_url!));
        allFilePaths.push(...purchaseImagePaths);
      }

      if (allFilePaths.length > 0) {
        const { error } = await supabase.storage.from("post-images").remove(allFilePaths);
        if (error) {
          console.error("이미지 삭제 실패:", error.message);
        }
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      cleanupImages(); // 이미 정리 호출
    };

    // 페이지 떠날 때 이벤트 연결
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      cleanupImages(); // 컴포넌트 언마운트 시 호출
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formState.images, formState.purchases]); // 구매 정보도 의존성에 추가

  // Supabase 파일 경로 추출 함수 (WritePage 컴포넌트 내부에 추가)
  const extractFilePath = (imageUrl: string): string => {
    const bucketUrl = supabase.storage.from("post-images").getPublicUrl("").data.publicUrl;
    return imageUrl.replace(bucketUrl, ""); // URL에서 파일 경로만 추출
  };

  // 로딩 상태 처리
  if (isPending) return <LoadingSpinner />;
  if (isError) {
    return <ErrorScreen error={new Error("게시물을 불러오는 데 문제가 발생했습니다.")} />;
  }

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-20">
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">게시물 수정하기</h1>
      </div>

      <div className="rounded-2xl border border-line-02 bg-bg-01 px-8 py-9">
        <ContentSection
          content={formState.content}
          onChange={(value) => {
            handleChange("content", value);
            updateMissingFields("content", value); // 실시간 필드 상태 업데이트
          }}
          isMissing={missingFields.includes("content")} // 필수 입력 경고 전달
        />

        <ImageUploadSection
          images={formState.images}
          blur={formState.thumbnail_blur_url}
          setImages={(updateFn) => {
            const updatedImages = typeof updateFn === "function" ? updateFn(formState.images) : updateFn;
            handleChange("images", updatedImages);
            updateMissingFields("images", updatedImages); // 실시간 필드 상태 업데이트
          }}
          setBlur={(blurUrl) => handleChange("thumbnail_blur_url", blurUrl)}
          isMissing={missingFields.includes("images")} // 필수 입력 경고 전달
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

            // 상품 추가로 인해 missingFields 업데이트
            updateMissingFields("purchases", [...formState.purchases, {}]); // 빈 객체로 추가된 상태를 가정
          }}
          onEdit={(index) => {
            handleChange("productToEdit", formState.purchases[index]);
            handleChange("isPurchaseModalOpen", true);
          }}
          onDelete={(index) => {
            const updatedPurchases = formState.purchases.filter((_, i) => i !== index);
            handleDeletePurchase(index);
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
        />
      </div>

      <div className="flex justify-center gap-6 pt-20">
        <button
          onClick={() => router.push(`/detail/${id}`)}
          className="rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body text-primary-default"
        >
          뒤로 가기
        </button>
        <button
          onClick={() => handleUpdate(id)}
          className="rounded-lg bg-primary-default px-8 py-4 text-body text-bg-01"
        >
          수정 완료
        </button>
      </div>

      {/* 최상단 이동 플로팅 버튼 */}
      <ScrollTopButton />

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
