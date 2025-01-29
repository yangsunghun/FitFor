"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import TagSection from "@/components/shared/TagSection";
import { Button } from "@/components/ui/Button";
import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { PostWithPurchases } from "@/lib/hooks/write/useFormStateHandlers";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddressModal from "./_components/AddressModal";
import BodySizeSection from "./_components/BodySizeSection";
import ContentSection from "./_components/ContentSection";
import ExitTempSaveModal from "./_components/ExitTempSaveModal";
import ImageUploadSection from "./_components/ImageUploadSection";
import LocationSection from "./_components/LocationSection";
import ProductSection from "./_components/ProductSection";
import PurchaseModal from "./_components/PurchaseModal";

const WritePage = () => {
  const currentUser = useAuthStore((state) => state.user);
  const router = useRouter();
  const [state, setState] = useState({
    isSaveModalOpen: false,
    isExitModalOpen: false, // 뒤로가기 모달 상태
    isWriting: false,
    unsavedPosts: [] as PostWithPurchases[],
    activePostId: null as string | null,
    pendingNavigation: null as string | null // 이동 예정 경로 저장
  });

  const {
    formState,
    handleChange,
    handleBodySizeChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    missingFields,
    updateMissingFields,
    handleSubmit,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory,
    checkIsWriting,
    fetchUnsavedPosts,
    handleContinuePost,
    handleDiscardPost,
    handleTemporarySave,
    handleFieldChange
  } = useFormHandlers();

  const isWriting = checkIsWriting(); // 작성 중 여부 확인
  const hasAlertShown = useRef(false);
  const navigationBlocked = useRef(false); // 네비게이션 중복 방지 플래그
  const popStateTriggered = useRef(false); // 뒤로가기 이벤트 중복 방지

  const fetchUnsavedPostsRef = useRef(fetchUnsavedPosts);
  const handleContinuePostRef = useRef(handleContinuePost);

  useEffect(() => {
    fetchUnsavedPostsRef.current = fetchUnsavedPosts; // 최신 함수 참조
    handleContinuePostRef.current = handleContinuePost; // 최신 함수 참조
  }, [fetchUnsavedPosts, handleContinuePost]);

  // 페이지 진입 시 임시 저장 게시글 확인
  useEffect(() => {
    if (currentUser?.id && !hasAlertShown.current) {
      hasAlertShown.current = true; // 첫 실행 시 플래그 설정
      (async () => {
        try {
          const posts = await fetchUnsavedPostsRef.current(currentUser.id);
          setState((prev) => ({ ...prev, unsavedPosts: posts }));

          if (posts.length > 0) {
            const latestPost = posts[0];
            const continueWriting = confirm(
              `${relativeTimeDay(latestPost.created_at)}에 작성한 글이 있습니다. 이어서 작성하시겠습니까?`
            );

            if (continueWriting) {
              setState((prev) => ({ ...prev, activePostId: latestPost.id })); // 활성화된 게시글 ID 업데이트
              await handleContinuePostRef.current(latestPost);
            } else {
              // 취소 시 임시 저장 삭제
              await handleDiscardPost(latestPost.id); // 임시 저장 삭제
              setState((prev) => ({ ...prev, activePostId: null })); // 활성화 ID 초기화
            }
          }
        } catch (error) {
          console.error("임시 저장 게시물 처리 중 오류 발생:", error);
        }
      })();
    }
  }, [currentUser, handleDiscardPost]);

  // 페이지 이동 처리 (Next.js의 router.push 포함)
  useEffect(() => {
    const originalPush = router.push; // 원래 push 함수 저장
    router.push = (url: string) => {
      if (isWriting && !navigationBlocked.current) {
        setState((prevState) => ({
          ...prevState,
          isExitModalOpen: true, // 모달 열기
          pendingNavigation: url // 이동하려는 경로 저장
        }));
        navigationBlocked.current = true; // 중복 방지
      } else {
        originalPush(url); // 바로 이동
      }
    };

    return () => {
      router.push = originalPush; // 원래 push 함수로 복원
    };
  }, [isWriting, router]);

  // 뒤로가기 및 페이지 이탈 감지
  useEffect(() => {
    const handlePopState = () => {
      if (isWriting && !popStateTriggered.current) {
        popStateTriggered.current = true; // 중복 실행 방지
        setState((prevState) => ({
          ...prevState,
          isExitModalOpen: true, // 모달 열기
          pendingNavigation: document.referrer || "/" // 🔹 뒤로가기 경로 저장
        }));
        window.history.pushState(null, "", window.location.href); // 🔹 다시 현재 페이지를 push
      }
    };

    window.history.pushState(null, "", window.location.href); // 🔹 추가: 최초 로딩 시 pushState 실행
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isWriting]);

  // 모달 확인 클릭 시 (임시 저장 후 이동)
  const handleConfirmExit = async () => {
    await handleTemporarySave(); // 🔹 임시 저장 수행
    if (state.pendingNavigation) {
      router.push(state.pendingNavigation); // 🔹 저장된 경로로 이동
    } else {
      window.history.back(); // 🔹 뒤로가기 실행 (fallback)
    }
  };

  // 모달 취소 클릭 시 (뒤로가기 취소 & 지정된 경로로 이동)
  const handleCancelExit = () => {
    setState((prevState) => ({
      ...prevState,
      isExitModalOpen: false, // 🔹 모달 닫기
      pendingNavigation: null // 🔹 경로 초기화
    }));

    setTimeout(() => {
      popStateTriggered.current = false; // 🔹 뒤로가기 플래그 초기화
    }, 100);

    if (state.pendingNavigation) {
      router.push(state.pendingNavigation); // 🔹 저장된 경로로 이동
    } else if (document.referrer) {
      window.location.href = document.referrer; // 🔹 이전 페이지로 이동 (정확한 referrer가 있을 때만)
    } else {
      router.push("/"); // 🔹 이전 페이지 정보가 없으면 홈으로 이동
    }
  };

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-20">
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">게시물 작성하기</h1>
        <p className="text-title2 text-text-03">나만의 룩이나 소개하고 싶은 옷을 공유해보세요!</p>
      </div>
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
          isRequired={false} // 이거 추가해주삼!
        />
      </div>
      <div className="flex justify-center gap-6 pt-20">
        <Button variant="primary" size="lg" onClick={handleSubmit} className="w-[180px]">
          등록하기
        </Button>
      </div>
      {/* 최상단 이동 플로팅 버튼 */}
      <ScrollTopButton />
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

      {/* 새로고침/뒤로가기 모달 */}
      <ExitTempSaveModal isOpen={state.isExitModalOpen} onConfirm={handleConfirmExit} onCancel={handleCancelExit} />
    </div>
  );
};

export default WritePage;
