"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import TagSection from "@/components/shared/TagSection";
import { useFormHandlers } from "@/lib/hooks/write/useFormHandlers";
import { PostWithPurchases } from "@/lib/hooks/write/useFormStateHandlers";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { useEffect, useRef, useState } from "react";
import AddressModal from "./_components/AddressModal";
import BodySizeSection from "./_components/BodySizeSection";
import ContentSection from "./_components/ContentSection";
import ImageUploadSection from "./_components/ImageUploadSection";
import LocationSection from "./_components/LocationSection";
import ProductSection from "./_components/ProductSection";
import PurchaseModal from "./_components/PurchaseModal";
import TempSaveModal from "./_components/TempSaveModal";

const WritePage = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [state, setState] = useState({
    isSaveModalOpen: false,
    unsavedPosts: [] as PostWithPurchases[],
    activePostId: null as string | null
  });

  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
    missingFields,
    updateMissingFields,
    handleSubmit,
    handleContinuePost,
    handleDiscardPost,
    handleTemporarySave,
    fetchUnsavedPosts,
    toggleTagSelector,
    handleChangeCategory,
    selectedCategory
  } = useFormHandlers();

  const hasAlertShown = useRef(false); // Alert 실행 상태

  const fetchUnsavedPostsRef = useRef(fetchUnsavedPosts);
  const handleContinuePostRef = useRef(handleContinuePost);

  useEffect(() => {
    fetchUnsavedPostsRef.current = fetchUnsavedPosts; // 최신 함수 참조
    handleContinuePostRef.current = handleContinuePost; // 최신 함수 참조
  }, [fetchUnsavedPosts, handleContinuePost]);

  useEffect(() => {
    if (currentUser?.id) {
      (async () => {
        try {
          const posts = await fetchUnsavedPostsRef.current(currentUser.id);
          setState((prev) => ({ ...prev, unsavedPosts: posts }));

          if (posts.length > 0 && !hasAlertShown.current) {
            const latestPost = posts[0];
            const continueWriting = confirm(
              `${relativeTimeDay(latestPost.created_at)}에 작성한 글이 있습니다. 이어서 작성하시겠습니까?`
            );

            if (continueWriting) {
              setState((prev) => ({ ...prev, activePostId: latestPost.id })); // 활성화된 게시글 ID 업데이트
              await handleContinuePostRef.current(latestPost);
            } else {
              setState((prev) => ({ ...prev, activePostId: null }));
            }

            hasAlertShown.current = true;
          }
        } catch (error) {
          console.error("임시 저장 게시물 처리 중 오류 발생:", error);
        }
      })();
    }
  }, [currentUser]);

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
          isRequired={false} // 이거 추가해주삼!
        />
      </div>

      <div className="flex justify-center gap-6 pt-20">
        {/* 임시 저장 버튼 */}
        <button
          onClick={async () => {
            try {
              await handleTemporarySave(); // 임시 저장 호출
              const posts = await fetchUnsavedPosts(currentUser?.id || "");
              setState((prev) => ({
                ...prev,
                unsavedPosts: posts,
                activePostId: formState.postId || state.activePostId // activePostId 유지
              }));
            } catch (error) {
              console.error("임시 저장 처리 중 오류:", error);
            }
          }}
          className="flex items-center gap-1 rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body text-primary-default"
        >
          <span>임시 저장</span>
          <span>|</span>
          <span
            style={{
              padding: "3px 6px", // 클릭 반경 확장
              margin: "-3px -6px", // 레이아웃 영향을 최소화
              display: "inline-block",
              cursor: "pointer"
            }}
            onClick={async (e) => {
              e.stopPropagation(); // 부모 버튼의 onClick 실행 방지
              try {
                const posts = await fetchUnsavedPosts(currentUser?.id || "");
                setState((prev) => ({ ...prev, unsavedPosts: posts, isSaveModalOpen: true }));
              } catch (error) {
                console.error("모달 데이터 갱신 중 오류:", error);
              }
            }}
          >
            {state.unsavedPosts.length}
          </span>
        </button>
        <button onClick={handleSubmit} className="rounded-lg bg-primary-default px-8 py-4 text-body text-bg-01">
          게시물 만들기
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

      <TempSaveModal
        isOpen={state.isSaveModalOpen}
        currentUser={currentUser}
        fetchUnsavedPosts={fetchUnsavedPosts}
        onContinue={(post) => {
          handleContinuePost(post);
          setState((prev) => ({ ...prev, activePostId: post.id }));
        }}
        onDiscard={async (postId) => {
          try {
            await handleDiscardPost(postId);
            const posts = await fetchUnsavedPosts(currentUser?.id || "");
            setState((prev) => ({ ...prev, unsavedPosts: posts }));
          } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
            alert("삭제 중 문제가 발생했습니다.");
          }
        }}
        onClose={() => {
          setState((prev) => ({ ...prev, isSaveModalOpen: false }));
        }}
        onTemporarySave={async () => {
          try {
            await handleTemporarySave(); // 임시 저장 호출
          } catch (error) {
            console.error("임시 저장 실패:", error);
          }
        }}
        activePostId={state.activePostId}
      />
    </div>
  );
};

export default WritePage;
