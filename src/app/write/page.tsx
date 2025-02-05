"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useWritePageHandlers } from "@/lib/hooks/write/useWritePageHandlers";
import { useWritePageState } from "@/lib/hooks/write/useWritePageState";
import ContinuePostModal from "./_components/ContinuePostModal";
import ExitTempSaveModal from "./_components/ExitTempSaveModal";
import PostForm from "./_components/PostForm";
import PostHeader from "./_components/PostHeader";
import SubmitButton from "./_components/SubmitButton";

const WritePage = () => {
  const pageState = useWritePageState();
  const handlers = useWritePageHandlers(pageState);

  // handleSubmit에서 모달이 뜨는 이슈 방지를 위해 상태 관리 핸들러 전달
  const handleSubmit = async () => {
    await pageState.handleSubmit(handlers.handleStartSubmit, handlers.handleEndSubmit); // 핸들러 전달
  };

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-20 tb:pt-10 mb:pt-4">
      <PostHeader mode="post" />
      <PostForm {...pageState} mode="post" />
      <SubmitButton onSubmit={handleSubmit} />
      <ScrollTopButton />
      <ExitTempSaveModal
        isOpen={pageState.state.isExitModalOpen}
        onConfirm={handlers.handleConfirmExit}
        onCancel={handlers.handleCancelExit}
      />
      <ContinuePostModal
        isOpen={pageState.state.isContinueModalOpen}
        onConfirm={pageState.onContinueModalConfirm}
        onCancel={pageState.onContinueModalCancel}
      />
    </div>
  );
};

export default WritePage;
