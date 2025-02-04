"use client";

import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";

type ContinuePostModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ContinuePostModal = ({ isOpen, onConfirm, onCancel }: ContinuePostModalProps) => {
  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링 X

  return (
    <ModalItem
      isOpen={isOpen}
      onClose={() => {}} // 모달 외부 클릭 시 아무런 동작도 하지 않도록 빈 함수 전달
      className="flex w-full max-w-[450px] flex-col items-start justify-start gap-4 !rounded-2xl p-6 mb:max-w-[343px] mb:gap-2 mb:px-4"
    >
      <span className="self-stretch text-title1 font-bold text-text-04 mb:text-title2">작성 중인 게시물이 있어요.</span>
      <p className="self-stretch text-subtitle text-text-03 mb:text-body">
        최근 저장된 글이 있습니다. 이어서 작성하시겠어요?
      </p>
      <div className="flex flex-nowrap items-center justify-start gap-3 self-stretch pt-2 mb:gap-2 mb:pt-2">
        <Button
          variant="disabled"
          size="lg"
          onClick={onCancel}
          className="flex w-full items-center justify-center px-6 py-4 tb:w-[195px] mb:w-[151px] mb:px-4 mb:py-3"
        >
          <span className="text-subtitle font-medium leading-[30px] text-text-04 tb:text-title2 mb:text-body">
            새 게시물 작성하기
          </span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onConfirm}
          className="flex w-full items-center justify-center px-6 py-4 tb:w-[195px] mb:w-[151px] mb:px-4 mb:py-3"
        >
          <span className="text-subtitle font-medium text-text-01 tb:text-title2 mb:text-body">이어쓰기</span>
        </Button>
      </div>
    </ModalItem>
  );
};

export default ContinuePostModal;
