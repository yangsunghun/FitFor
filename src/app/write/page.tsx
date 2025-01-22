"use client";

import TagSection from "@/components/shared/TagSection";
import { PostWithPurchases, useFormHandlers } from "@/lib/hooks/write/useFormHanlders";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
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
  const handleChangeRef = useRef(handleChange);

  useEffect(() => {
    if (currentUser?.id) {
      (async () => {
        const posts = await fetchUnsavedPostsRef.current(currentUser.id);
        setUnsavedPosts(posts);
  
        if (posts.length > 0 && !hasAlertShown.current) {
          const latestPost = posts[0]; // 가장 최근의 임시 저장 게시물
          if (confirm(`${relativeTimeDay(latestPost.created_at)}에 작성한 글이 있습니다. 이어서 작성하시겠습니까?`)) {
            handleContinuePostRef.current(latestPost);
            handleChangeRef.current("isContinued", true); // 이어 작성 설정
          } else {
            handleChangeRef.current("isContinued", false); // 새 게시글로 작성
          }
          hasAlertShown.current = true; // Alert 실행 상태 업데이트
        } else {
          // 임시 저장 게시글이 없을 때 초기화
          handleChangeRef.current("isContinued", false);
        }
      })();
    }
  }, [currentUser]);

  const handleSaveClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const clickedElement = e.target as HTMLElement;
  
    if (clickedElement.textContent === `${unsavedPosts.length}`) {
      // unsavedPosts.length 부분을 클릭하면 모달 표시
      console.log("Opening modal to show unsaved posts...");
      setIsSaveModalOpen(true);
    } else if (formState.isContinued) {
      // 이어 작성된 게시물을 업데이트
      console.log("Continuing post, saving changes...");
      handleTemporarySave();
    } else {
      // 새로운 게시글로 등록
      console.log("Creating a new temporary draft...");
      handleTemporarySave();
    }
  };

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
              // unsavedPosts.length 부분을 클릭하면 모달 표시
              setIsSaveModalOpen(true);
            } else {
              // "임시 저장" 부분을 클릭하면 임시 저장 수행
              handleSaveClick(e);
            }
          }}
          className="flex items-center gap-1 rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body text-primary-default"
        >
          <span>임시 저장</span>
          <span>|</span>
          <span>{unsavedPosts.length}</span>
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

      {currentUser && (
        <TempSaveModal
          isOpen={isSaveModalOpen}
          currentUser={currentUser}
          fetchUnsavedPosts={async () => {
            if (!currentUser) return [];
            const posts = await fetchUnsavedPosts(currentUser.id);
            setUnsavedPosts(posts);
            return posts;
          }}
          onContinue={(post) => {
            handleContinuePost(post);
            handleChange("isContinued", true);
            setIsSaveModalOpen(false);
          }}
          onDiscard={(postId) => {
            handleDiscardPost(postId);
            setUnsavedPosts((prev) => prev.filter((p) => p.id !== postId));
          }}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
};

export default WritePage;
