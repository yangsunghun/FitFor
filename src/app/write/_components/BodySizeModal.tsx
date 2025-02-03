"use client";

import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";

type BodySizeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bodySize: number[];
  onChange: (index: number, value: string) => void;
  onSave: () => void;
};

const BodySizeModal = ({ isOpen, onClose, bodySize, onChange, onSave }: BodySizeModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalItem
      isOpen={isOpen}
      onClose={onClose}
      className="flex w-full max-w-[343px] !rounded-2xl flex-col items-start justify-start p-6 px-4"
    >
      <span className="mb-6 text-title2 font-bold text-text-04">신체 정보</span>

      {/* 각 입력창 항목 사이 16px 간격 */}
      <div className="flex w-full flex-col gap-4">
        {["키", "몸무게"].map((label, index) => (
          <div key={index} className="space-y-2 w-full">
            <label className="font-medium text-text-04">{label}</label>
            <div className="flex h-11 items-center justify-between rounded-lg bg-bg-02 p-4">
              <input
                value={bodySize[index] || ""}
                onChange={(e) => onChange(index, e.target.value)}
                className="w-full bg-transparent font-medium outline-none"
                placeholder={`${label}를 입력해주세요.`}
              />
              <span className="text-text-04">{index === 0 ? "cm" : "kg"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 입력창과 저장하기 버튼 사이 24px 간격 */}
      <Button variant="primary" size="sm" onClick={onSave} className="w-full mt-6">
        저장하기
      </Button>
    </ModalItem>
  );
};

export default BodySizeModal;