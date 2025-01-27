import { textFieldVariants } from "@/components/ui/TextField";
import { cn } from "@/lib/utils/common/className";

type ContentSectionProps = {
  content: string;
  onChange: (value: string) => void;
  isMissing?: boolean; // 필수 입력 경고 표시 여부
};

const ContentSection = ({ content, onChange,isMissing }: ContentSectionProps) => (
  <div className="space-y-2">
    {/* 제목 영역 */}
    <div className="flex items-center gap-1">
      <span className="text-title2 font-bold text-text-04">본문</span>
      <span className="text-title2 font-bold text-primary-default">*</span>
    </div>
    {/* textarea 영역 */}
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)} // 줄바꿈 포함된 텍스트 전달
      rows={5}
      className={cn(
        textFieldVariants({ variant: "default", version: "desktop" }), // TextField 스타일 적용
        "focus-visible:box-shadow-none h-auto w-full resize-none p-4 text-body font-medium placeholder-text-02 focus:outline-none focus-visible:border-transparent focus-visible:ring-0"
      )}
      placeholder="예시 - 소개팅 가야하는데 도와주세요"
    />
    {isMissing && <p className="pt-4 pl-2 text-body text-status-danger">본문을 입력해주세요.</p>}
  </div>
);

export default ContentSection;
