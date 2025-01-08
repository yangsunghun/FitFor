import React from "react";

interface MoveActionsProps {
  onNext: () => void; // "다음" 버튼 클릭 시 호출되는 함수
  onPrev: () => void; // "이전" 버튼 클릭 시 호출되는 함수
  onSubmit?: () => void; // "완료" 버튼 클릭 시 호출되는 함수 (선택적)
  currentStep: string; // 현재 단계 이름
  isPending?: boolean; // "다음" 또는 "완료" 버튼 클릭 중 상태
}

const MoveActions: React.FC<MoveActionsProps> = ({ onNext, onPrev, onSubmit, currentStep, isPending = false }) => {
  return (
    <div className="mt-8 flex w-full max-w-md justify-between">
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={onPrev}
        className="rounded bg-gray-300 px-4 py-2 text-black transition-all hover:bg-gray-400"
        disabled={isPending || currentStep === "title"} // "title" 단계에서는 비활성화
      >
        이전
      </button>

      {/* 조건부로 "다음" 또는 "완료" 버튼 렌더링 */}
      {onSubmit && currentStep === "completion" ? (
        <button
          type="button"
          onClick={onSubmit}
          className="bg-main hover:bg-main-hover rounded px-6 py-2 text-white transition-all"
          disabled={isPending} // "완료" 버튼은 로딩 상태일 때 비활성화
        >
          {isPending ? "완료 중..." : "완료"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="bg-main hover:bg-main-hover rounded px-6 py-2 text-white transition-all"
          disabled={isPending} // "다음" 버튼은 로딩 상태일 때 비활성화
        >
          {isPending ? "로딩 중..." : "다음"}
        </button>
      )}
    </div>
  );
};

export default MoveActions;
