import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useState } from "react";

const supabase = createClient();

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    title: string;
    description: string;
    price: number;
    image_url: string;
  }) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 최대 업로드 파일 크기 5MB

const PurchaseModal = ({ isOpen, onClose, onAddProduct }: ProductModalProps) => {
  // 입력 폼 상태 관리
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: "" as number | "",
    image_url: "",
  });

  const { title, description, price, image_url } = formState;

  // 입력 필드 값 변경 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value, // 가격은 숫자로 변환
    }));
  };

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string> => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다."); // 파일 크기 확인
    }

    // 고유 파일 이름 생성
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "unknown";
    const uniqueFileName = `${timestamp}.${extension}`;
    const filePath = `purchase/${uniqueFileName}`;

    // Supabase 스토리지에 이미지 업로드
    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);

    // 업로드된 이미지의 공개 URL 반환
    const { publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath).data;

    if (!publicUrl) throw new Error("이미지 URL 생성 실패");

    return publicUrl;
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const url = await uploadImage(file); // 이미지 업로드
          setFormState((prevState) => ({ ...prevState, image_url: url }));
        } catch (error: any) {
          alert(error.message); // 에러 알림
        }
      }
    };
    fileInput.click(); // 파일 선택 창 열기
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 필수 입력 항목 확인
    if (!title || !description || !price || !image_url) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 부모 컴포넌트에 상품 데이터 전달
    onAddProduct({ title, description, price: Number(price), image_url });
    onClose(); // 모달 닫기
  };

  // 모달이 닫혀 있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">상품 정보 입력</h2>

        {/* 이미지 업로드 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">상품 이미지</label>
          <div
            className="w-32 h-32 border border-gray-300 flex items-center justify-center rounded-lg cursor-pointer"
            onClick={handleImageUpload}
          >
            {image_url ? (
              <Image
                src={image_url}
                alt="Uploaded"
                width={128}
                height={128}
                objectFit="cover"
                className="rounded-lg"
              />
            ) : (
              <span className="text-gray-400">+ 추가</span>
            )}
          </div>
        </div>

        {/* 상품명 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">상품명</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="상품명을 입력해주세요."
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* 설명 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">설명</label>
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="상품의 설명을 작성해주세요."
            className="w-full p-2 border rounded-md resize-none"
            rows={2}
          ></textarea>
        </div>

        {/* 가격 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">가격</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
            placeholder="상품의 가격을 입력해주세요."
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            onClick={handleSubmit}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;