"use client";

import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/utils/supabase/client";
import { Image as ImageIcon, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const supabase = createClient();
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type PurchaseSliderProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: {
    title: string;
    description: string;
    buy_link: string;
    image_url: string;
    post_id: string;
  }) => void;
  productToEdit?: { title: string; description: string; buy_link: string; image_url: string; post_id: string } | null;
  mode: "add" | "edit";
};

const PurchaseSlider = ({ isOpen, onClose, onSubmit, productToEdit, mode }: PurchaseSliderProps) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    buy_link: "",
    image_url: "",
    post_id: ""
  });

  const [loading, setLoading] = useState(false);
  const [blurData, setBlurData] = useState<string | null>(null);

  const { title, description, buy_link, image_url } = formState;

  useEffect(() => {
    if (productToEdit) {
      // 수정 모드에서 데이터 초기화
      setFormState({
        title: productToEdit.title,
        description: productToEdit.description || "",
        buy_link: productToEdit.buy_link || "",
        image_url: productToEdit.image_url || "",
        post_id: productToEdit.post_id || ""
      });
    } else {
      // 추가 모드에서 초기 상태로 리셋
      resetForm();
    }
  }, [productToEdit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setLoading(true);
        try {
          const blur = await generateBlurData(file);
          setBlurData(blur);
          const url = await uploadImage(file);
          setFormState((prevState) => ({ ...prevState, image_url: url }));
        } catch (error: any) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fileInput.click();
  };

  const generateBlurData = async (file: File): Promise<string | null> => {
    try {
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const width = 5;
      const height = (imageBitmap.height / imageBitmap.width) * width;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(imageBitmap, 0, 0, width, height);
      return canvas.toDataURL("image/jpeg", 0.5);
    } catch (error) {
      console.error("Blur 데이터 생성 실패:", error);
      return null;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
    }

    const filePath = `purchase/${Date.now()}.${file.name.split(".").pop() || "unknown"}`;
    const { error } = await supabase.storage.from("post-images").upload(filePath, file, { cacheControl: "3600" });

    if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);

    const { publicUrl } = supabase.storage.from("post-images").getPublicUrl(filePath).data;
    if (!publicUrl) throw new Error("이미지 URL 생성 실패");

    return publicUrl;
  };

  const handleDeleteImage = async () => {
    if (!image_url) {
      alert("삭제할 이미지가 없습니다.");
      return;
    }

    try {
      const filePath = image_url.replace(supabase.storage.from("post-images").getPublicUrl("").data.publicUrl, "");
      const { error } = await supabase.storage.from("post-images").remove([filePath]);

      if (error) {
        alert("이미지 삭제에 실패했습니다.");
        return;
      }

      setFormState((prevState) => ({ ...prevState, image_url: "" }));
      setBlurData(null);
    } catch (error) {
      alert("이미지 삭제 중 오류가 발생했습니다.");
    }
  };

  const resetForm = () => {
    setFormState({ title: "", description: "", buy_link: "", image_url: "", post_id: "" });
  };

  const handleSubmit = () => {
    onSubmit(formState);
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-full p-4">
      {/* 이미지 업로드 섹션 */}
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-[10.4rem] w-full max-w-[10.4rem] items-center justify-center overflow-hidden rounded-lg border border-line-01 bg-bg-02"
          onClick={handleImageUpload} // 이미지 컨테이너 클릭 시 업로드 핸들러 호출
        >
          {loading && blurData ? (
            <>
              <Image src={blurData} alt="Uploading" layout="fill" objectFit="cover" className="rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-caption font-medium text-white">이미지 업로드 중...</span>
              </div>
            </>
          ) : image_url ? (
            <>
              <Image src={image_url} alt="Uploaded" layout="fill" objectFit="cover" className="rounded-lg" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage();
                }}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg-01 text-text-03"
              >
                <Trash size={16} />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon size={48} className="text-text-02" />
            </div>
          )}
        </div>
      </div>

      {/* 입력 필드 */}
      <div className="space-y-4 py-6">
        {/* 상품명 */}
        <div className="space-y-2">
          <label className="block font-medium text-text-04">상품명</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="상품명을 입력해 주세요."
            autoComplete="off"
            className="w-full rounded-lg bg-bg-02 px-3 py-2 text-text-04 focus:outline-none"
          />
        </div>

        {/* 브랜드명 */}
        <div className="space-y-2">
          <label className="block font-medium text-text-04">브랜드명</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="브랜드명을 입력해 주세요."
            autoComplete="off"
            className="w-full rounded-lg bg-bg-02 px-3 py-2 text-text-04 focus:outline-none"
          />
        </div>

        {/* 링크 */}
        <div className="space-y-2">
          <label className="block font-medium text-text-04">링크</label>
          <input
            type="url"
            name="buy_link"
            value={buy_link}
            onChange={handleInputChange}
            placeholder="예시 - www.naver.com"
            autoComplete="off"
            className="w-full rounded-lg bg-bg-02 px-3 py-2 text-text-04 focus:outline-none"
          />
        </div>
      </div>

      {/* 완료 버튼 */}
      <div>
        <Button
          variant={title && image_url ? "primary" : "disabled"} // 입력값에 따라 variant 변경
          size="sm"
          className="w-full"
          onClick={handleSubmit}
          disabled={!title || !image_url} // 비활성화 조건 추가
        >
          {mode === "add" ? "완료" : "수정하기"}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseSlider;
