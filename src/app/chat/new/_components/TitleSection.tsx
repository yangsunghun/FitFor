type TitleSectionProps = {
  title: string;
  onChange: (value: string) => void;
  error?: string;
};

const TitleSection = ({ title, onChange, error }: TitleSectionProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-1">
      <span className="text-title2 font-bold text-text-04 mb:text-body mb:font-medium">Live 이름</span>
      <span className="text-title2 font-bold text-primary-default mb:text-body mb:font-medium">*</span>
    </div>
    <textarea
      value={title}
      onChange={(e) => {
        onChange(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      rows={1}
      className="h-38 w-full resize-none rounded-lg bg-bg-02 p-4 text-body font-medium placeholder-text-02 focus:outline-none mb:p-3"
      placeholder="예시 - 소개팅 가야하는데 도와주세요"
    />
    {/* 에러 메시지 */}
    {error && <p className="text-sm mt-2 text-status-danger">{error}</p>}
  </div>
);

export default TitleSection;
