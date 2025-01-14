import { ListBullets, SquaresFour } from "@phosphor-icons/react";

type LayoutToggleProps = {
  isMasonry: boolean; // 현재 레이아웃 상태
  onToggle: () => void; // 레이아웃 전환 함수
};

const LayoutToggle = ({ isMasonry, onToggle }: LayoutToggleProps) => {
  return (
    <div className="mb-10 flex justify-end gap-2">
      <button
        onClick={isMasonry ? undefined : onToggle}
        className={`h-12 w-12 transition-colors duration-300 ${isMasonry ? "text-text-04" : "text-text-02"}`}
        disabled={isMasonry}
        aria-pressed={isMasonry}
        aria-label="메이슨리 레이아웃"
      >
        <ListBullets size={32} />
      </button>
      <button
        onClick={isMasonry ? onToggle : undefined}
        className={`h-12 w-12 transition-colors duration-300 ${!isMasonry ? "text-text-04" : "text-text-02"}`}
        disabled={!isMasonry} // 이미 활성화된 상태에서는 비활성화
        aria-pressed={!isMasonry}
        aria-label="리스트 레이아웃"
      >
        <SquaresFour size={32} />
      </button>
    </div>
  );
};

export default LayoutToggle;
