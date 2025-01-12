type LayoutToggleProps = {
  isMasonry: boolean; // 현재 레이아웃 상태
  onToggle: () => void; // 레이아웃 전환 함수
};

const LayoutToggle = ({ isMasonry, onToggle }: LayoutToggleProps) => {
  return (
    <div
      onClick={onToggle}
      className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-all duration-300 ${
        isMasonry ? "bg-blue-500" : "bg-gray-300"
      }`}
      role="button"
      aria-pressed={isMasonry} // 상태 전달
      aria-label="레이아웃 전환"
    >
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
          isMasonry ? "translate-x-6" : "translate-x-1"
        }`}
      ></div>
    </div>
  );
};

export default LayoutToggle;
