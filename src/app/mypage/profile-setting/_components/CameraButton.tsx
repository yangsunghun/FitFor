import { Button } from "@/components/ui/Button";
import { Camera } from "@phosphor-icons/react";

const CameraButton = () => {
  return (
    <Button
      variant="disabledLine"
      size="sm"
      asChild
      className="absolute -bottom-[22px] tb:-bottom-[11px] left-1/2 flex -translate-x-1/2 transform cursor-pointer flex-row items-center gap-2 rounded-[999px] border-none tb:max-h-8 bg-white px-4 py-2 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] tb:gap-1 tb:px-2 tb:py-1"
    >
      <label htmlFor="fileInput">
        <Camera className="text-text-04 text-title1 tb:text-body" weight="fill" />
        <span className="text-body font-medium text-text-04 tb:text-caption">수정</span>
      </label>
    </Button>
  );
};

export default CameraButton;
