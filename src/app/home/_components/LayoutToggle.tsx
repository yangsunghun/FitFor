import { ListBullets, SquaresFour } from "@phosphor-icons/react";

type LayoutToggleProps = {
  isMasonry: boolean;
  onToggle: () => void;
};

const LayoutToggle = ({ isMasonry, onToggle }: LayoutToggleProps) => {
  return (
    <div className="mb-10 flex justify-end gap-2">
      <button
        onClick={isMasonry ? onToggle : undefined}
        className={`flex h-12 w-12 items-center justify-center transition-colors duration-300 ${!isMasonry ? "text-text-04" : "text-text-02"}`}
        disabled={!isMasonry}
        aria-pressed={!isMasonry}
        aria-label="리스트 레이아웃"
      >
        <SquaresFour size={32} />
      </button>
      <button
        onClick={isMasonry ? undefined : onToggle}
        className={`flex h-12 w-12 items-center justify-center transition-colors duration-300 ${isMasonry ? "text-text-04" : "text-text-02"}`}
        disabled={isMasonry}
        aria-pressed={isMasonry}
        aria-label="isMasonry 레이아웃"
      >
        <ListBullets size={32} />
      </button>
    </div>
  );
};

export default LayoutToggle;
