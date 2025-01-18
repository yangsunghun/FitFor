import { Button } from "@/components/ui/Button";
import { Camera } from "@phosphor-icons/react";

const CameraButton = () => {
  return (
    <Button
      variant="disabledLine"
      size="sm"
      asChild
      className="absolute -bottom-[22px] left-1/2 flex -translate-x-1/2 transform cursor-pointer flex-row items-center gap-2 rounded-[999px] border-none bg-white px-4 py-2 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]"
    >
      <label htmlFor="fileInput">
        <Camera size={24} className="text-text-04" weight="fill" />{" "}
        <span className="text-body font-medium text-text-04">수정</span>
      </label>
    </Button>
  );
};

export default CameraButton;
