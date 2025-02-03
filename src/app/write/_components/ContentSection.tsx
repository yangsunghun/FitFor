import { textFieldVariants } from "@/components/ui/TextField";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { cn } from "@/lib/utils/common/className";

type ContentSectionProps = {
  content: string;
  onChange: (value: string) => void;
  isMissing?: boolean; // 필수 입력 경고 표시 여부
};

const ContentSection = ({ content, onChange, isMissing }: ContentSectionProps) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div className="space-y-2">
      {/* 제목 영역 */}
      <div className="flex items-center">
        <span className="text-title2 font-bold text-text-04 mb:text-body mb:font-medium">본문</span>
        <span className="text-title2 font-bold text-primary-default mb:text-body mb:font-medium">*</span>
      </div>
      {/* textarea 영역 */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)} // 줄바꿈 포함된 텍스트 전달
        rows={isTabletOrSmaller ? 3 : 5} // tb 이하에서는 rows 3 적용
        className={cn(
          textFieldVariants({ variant: "default", version: "desktop" }), // TextField 스타일 적용
          "focus-visible:box-shadow-none mb:py:2 h-auto w-full resize-none p-4 text-body font-medium placeholder-text-02 focus:outline-none focus-visible:border-transparent focus-visible:ring-0 mb:px-3"
        )}
        placeholder={
          isTabletOrSmaller
            ? "어떤 룩인지 짧은 소개로 작성해보세요" // tb 이하에서의 placeholder
            : "예시 - 소개팅 가야하는데 도와주세요"
        }
      />
      {isMissing && (
        <p className="pt-2 text-title2 font-medium text-status-danger tb:text-body">본문을 입력해주세요.</p>
      )}
    </div>
  );
};

export default ContentSection;
