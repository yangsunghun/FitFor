"use client";

import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";

type ExitTempSaveModalProps = {
  isOpen: boolean;
  onConfirm: () => void; // "확인" 버튼 클릭 핸들러
  onCancel: () => void; // "취소" 버튼 클릭 핸들러
};

const ExitTempSaveModal = ({ isOpen, onConfirm, onCancel }: ExitTempSaveModalProps) => {
  if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

  return (
    <ModalItem
      isOpen={isOpen}
      onClose={() => {}} // 모달 외부 클릭 시 아무런 동작도 하지 않도록 빈 함수 전달
      className="flex max-w-[450px] flex-col items-start justify-start gap-4 p-6"
    >
      <span className="self-stretch text-title1 font-bold text-text-04">저장하지 않고 나가시겠어요?</span>
      <p className="self-stretch text-subtitle text-text-03">페이지를 떠날 경우 입력하신 정보가 모두 사라져요.</p>
      <div className="flex items-center justify-start gap-3 self-stretch">
        <Button
          variant="disabled"
          size="lg"
          onClick={onCancel}
          className="flex w-full items-center justify-center px-6 py-4 lg:w-[195px]"
        >
          <span className="text-subtitle font-medium text-text-04">나가기</span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onConfirm}
          className="flex w-full items-center justify-center px-6 py-4 lg:w-[195px]"
        >
          <span className="text-subtitle font-medium text-text-01">저장하기</span>
        </Button>
      </div>
    </ModalItem>
  );
};

export default ExitTempSaveModal;
