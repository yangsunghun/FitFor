import { ALLOWED_IMAGE_FILE_TYPES } from "@/lib/constants/constants";
import { toast } from "@/lib/utils/common/toast";
import Image from "next/image";
import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react";
import CameraButton from "./CameraButton";

type ProfileImageUploadSectionProps = {
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImagePreview: Dispatch<SetStateAction<string | null>>;
  imagePreview: string | null;
};

const ProfileImageUploadSection = ({ setImageFile, setImagePreview, imagePreview }: ProfileImageUploadSectionProps) => {
  // 이미지 업로드 (파일 선택)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.type)) {
        toast("PNG, JPG, JPEG, 그리고 GIF 파일만 첨부가 가능합니다.", "warning");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 이미지 드롭 다운
  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.type)) {
        toast("PNG, JPG, JPEG, 그리고 GIF 파일만 첨부가 가능합니다.", "warning");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative flex h-[12.5rem] w-[12.5rem] items-center justify-center rounded-full bg-gray-300 tb:h-[7.5rem] tb:w-[7.5rem]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleImageDrop}
    >
      {/* 이미지 preview */}
      {imagePreview && (
        <Image
          src={imagePreview}
          alt="Preview"
          fill
          className="h-full w-full rounded-full border border-gray-100 object-cover"
        />
      )}

      {/* 카메라 버튼 */}
      <CameraButton />

      {/* 파일 선택 부분 */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute -bottom-[14px] z-10 max-w-20 cursor-pointer overflow-hidden opacity-0 tb:-bottom-[9px] tb:max-w-12"
      />
    </div>
  );
};

export default ProfileImageUploadSection;
