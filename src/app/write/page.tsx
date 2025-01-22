"use client";

import TagSection from "@/components/shared/TagSection";
import { PostWithPurchases, useFormHandlers } from "@/lib/hooks/write/useFormHanlders";
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
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [unsavedPosts, setUnsavedPosts] = useState<PostWithPurchases[]>([]);
  const [activePostId, setActivePostId] = useState<string | null>(null); // 현재 작성 중인 Post ID

  const {
    formState,
    handleChange,
    handleAddPurchase,
    handleEditPurchase,
    handleDeletePurchase,
    handleBodySizeChange,
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
          setUnsavedPosts(posts);

          if (posts.length > 0 && !hasAlertShown.current) {
            const latestPost = posts[0];
            const continueWriting = confirm(
              `${relativeTimeDay(latestPost.created_at)}에 작성한 글이 있습니다. 이어서 작성하시겠습니까?`
            );

            if (continueWriting) {
              setActivePostId(latestPost.id); // 활성화된 게시글 ID 업데이트
              await handleContinuePostRef.current(latestPost);
            } else {
              setActivePostId(null);
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
        {/* 임시 저장 버튼 */}
        <button
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.textContent === `${unsavedPosts.length}`) {
              setIsSaveModalOpen(true); // 모달 표시
            } else {
              // "임시 저장" 부분을 클릭하면 임시 저장 수행
              handleTemporarySave();
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
            onClick={() => setIsSaveModalOpen(true)} // 모달 열기
          >
            {unsavedPosts.length}
          </span>
        </button>
        <button onClick={handleSubmit} className="rounded-lg bg-primary-default px-8 py-4 text-body text-bg-01">
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

      <TempSaveModal
        isOpen={isSaveModalOpen}
        currentUser={currentUser}
        fetchUnsavedPosts={fetchUnsavedPosts}
        onContinue={(post) => {
          handleContinuePost(post);
          setActivePostId(post.id); // 이어작성할 게시글 ID 설정
        }}
        onDiscard={(postId) => {
          handleDiscardPost(postId);
          if (postId === activePostId) {
            setActivePostId(null); // 삭제 시 활성화 상태 초기화
          }
        }}
        onClose={() => setIsSaveModalOpen(false)}
        activePostId={activePostId} // 현재 작성 중인 Post ID 전달
      />
    </div>
  );
};

export default WritePage;
