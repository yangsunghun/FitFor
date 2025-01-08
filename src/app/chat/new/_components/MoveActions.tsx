interface MoveActionsProps {
  onNext: () => void;
  onPrev: () => void;
  currentStep: string;
  isPending: boolean;
  onSubmit: () => void;
}

const MoveActions: React.FC<MoveActionsProps> = ({ onNext, onPrev, currentStep, isPending, onSubmit }) => {
  return (
    <div className="mt-4 flex w-full justify-between">
      {currentStep !== "introduction" && (
        <button type="button" onClick={onPrev} className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
          이전
        </button>
      )}
      <button
        type="button"
        onClick={currentStep === "completion" ? onSubmit : onNext}
        className={`${isPending ? "bg-gray-400" : "bg-main hover:bg-main-hover"} rounded px-4 py-2 text-white`}
        disabled={isPending}
      >
        {currentStep === "completion" ? "완료" : "다음"}
      </button>
    </div>
  );
};

export default MoveActions;
