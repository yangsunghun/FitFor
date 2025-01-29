"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useWritePageHandlers } from "@/lib/hooks/write/useWritePageHandlers";
import { useWritePageState } from "@/lib/hooks/write/useWritePageState";
import ExitTempSaveModal from "./_components/ExitTempSaveModal";
import SubmitButton from "./_components/SubmitButton";
import WriteForm from "./_components/WriteForm";
import WriteHeader from "./_components/WriteHeader";

const WritePage = () => {
  const pageState = useWritePageState();
  const handlers = useWritePageHandlers(pageState);

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-20">
      <WriteHeader />
      <WriteForm {...pageState} />
      <SubmitButton onSubmit={pageState.handleSubmit} />
      <ScrollTopButton />
      <ExitTempSaveModal
        isOpen={pageState.state.isExitModalOpen}
        onConfirm={handlers.handleConfirmExit}
        onCancel={handlers.handleCancelExit}
      />
    </div>
  );
};

export default WritePage;
