interface ProgressBarProps {
  currentStepIndex: number;
  steps: string[];
}

const ProgressBar = ({ currentStepIndex, steps }: ProgressBarProps) => {
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="bg-gray-100 p-4">
      {/* 진행도 바 */}
      <div className="relative h-2 w-full rounded-full bg-gray-300">
        <div className="absolute left-0 top-0 h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* 단계 제목 */}
      <div className="text-xs mt-2 flex justify-between text-gray-700">
        {steps.map((step, index) => (
          <span key={index} className={`${index <= currentStepIndex ? "font-bold text-black" : "text-gray-400"}`}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

// 임시로 사용중인 progress bar
