type ContentSectionProps = {
  content: string;
  onChange: (value: string) => void;
};

const ContentSection = ({ content, onChange }: ContentSectionProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-1">
      <span className="text-title2 font-bold text-text-04">본문</span>
      <span className="text-title2 font-bold text-primary-default">*</span>
    </div>
    <textarea
      value={content}
      onChange={(e) => {
        onChange(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      rows={6}
      className="h-38 w-full resize-none rounded-lg bg-bg-02 p-4 text-body font-medium placeholder-text-02"
      placeholder="예시 - 소개팅 가야하는데 도와주세요"
    />
  </div>
);

export default ContentSection;
