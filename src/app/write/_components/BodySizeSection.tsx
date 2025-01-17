type BodySizeSectionProps = {
    bodySize: number[];
    onChange: (index: number, value: string) => void;
  }
  
  const BodySizeSection = ({ bodySize, onChange }: BodySizeSectionProps) => (
    <div className="space-y-6 pt-10">
      {['키', '몸무게'].map((label, index) => (
        <div key={index} className="space-y-2">
          <label className="text-title2 font-bold text-text-04">{label}</label>
          <div className="h-14 p-4 bg-bg-02 rounded-lg flex items-center justify-between">
            <input
              value={bodySize[index] || ''}
              onChange={(e) => onChange(index as 0 | 1, e.target.value)}
              className="bg-transparent w-full text-body font-medium outline-none"
              placeholder={`${label}를 입력해주세요.`}
            />
            <span className="text-text-02">{index === 0 ? 'cm' : 'kg'}</span>
          </div>
        </div>
      ))}
    </div>
  );
  
  export default BodySizeSection;