"use client";

import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import BodySizeModal from "./BodySizeModal";

type BodySizeSectionProps = {
  bodySize: number[];
  onChange: (index: number, value: string) => void;
};

const BodySizeSection = ({ bodySize, onChange }: BodySizeSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBodySize, setModalBodySize] = useState([...bodySize]);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  // 모달이 열릴 때마다 부모의 저장된 신체 정보 값으로 동기화
  useEffect(() => {
    if (isModalOpen) {
      setModalBodySize([...bodySize]);
    }
  }, [isModalOpen, bodySize]);

  // 화면 사이즈가 태블릿 이상으로 변경되면 모달을 자동으로 닫기!!!
  useEffect(() => {
    if (!isTabletOrSmaller && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isTabletOrSmaller, isModalOpen]);

  // 모바일 모달에서 저장 버튼 클릭 시, 모달 상태의 값을 부모 핸들러에 전달
  const handleSave = () => {
    modalBodySize.forEach((size, index) => {
      onChange(index, size.toString());
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* 모바일 레이아웃 */}
      <Tablet>
        <div className="flex cursor-pointer items-center justify-between py-4" onClick={() => setIsModalOpen(true)}>
          <div className="flex flex-col gap-1">
            <span className="text-title2 font-medium text-text-04 mb:text-body">신체 정보</span>
            <span
              className={`font-medium mb:text-caption ${
                bodySize[0] && bodySize[1] ? "text-primary-default" : "text-text-03"
              }`}
            >
              {bodySize[0] ? `${bodySize[0]}cm` : "키와 몸무게를 입력해 주세요."}
              {bodySize[0] && bodySize[1] ? " / " : ""}
              {bodySize[1] ? `${bodySize[1]}kg` : ""}
            </span>
          </div>
          <CaretRight size={20} className="text-text-03" />
        </div>
      </Tablet>

      {/* 데스크탑 레이아웃 */}
      <MinTablet>
        <div className="space-y-6 pt-10">
          {["키", "몸무게"].map((label, index) => (
            <div key={index} className="space-y-2">
              <label className="text-title2 font-bold text-text-04">{label}</label>
              <div className="flex h-14 items-center justify-between rounded-lg bg-bg-02 p-4">
                <input
                  value={bodySize[index] || ""}
                  // 데스크탑은 입력 시 바로 부모 핸들러에 전달
                  onChange={(e) => onChange(index, e.target.value)}
                  className="w-full bg-transparent text-body font-medium outline-none"
                  placeholder={`${label}를 입력해주세요.`}
                />
                <span className="text-text-02">{index === 0 ? "cm" : "kg"}</span>
              </div>
            </div>
          ))}
        </div>
      </MinTablet>

      {/* 모달 */}
      <BodySizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bodySize={modalBodySize}
        onChange={(index, value) =>
          setModalBodySize((prev) => [...prev.slice(0, index), parseInt(value || "0"), ...prev.slice(index + 1)])
        }
        onSave={handleSave}
      />
    </div>
  );
};

export default BodySizeSection;
