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
    <ModalItem isOpen={isOpen} onClose={onCancel}>

        <span className="text-title1 text-text-04 font-bold">저장하지 않고 나가시겠어요?</span>
        <p className="mt-2 text-subtitle text-text-03">
          페이지를 떠나게 되면 입력하신 정보가 모두 사라져요.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="disabled" size="lg" onClick={onCancel} className="w-full !text-text-04">
            나가기
          </Button>
          <Button variant="primary" size="lg" onClick={onConfirm} className="w-full">
            저장하기
          </Button>
        </div>
    </ModalItem>
  );
};

export default ExitTempSaveModal;