import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const supabase = createClient();
const genUniqueId = () => {
  return crypto.randomUUID(); // 고유 ID 생성
};

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Database["public"]["Tables"]["purchase"]["Insert"]) => void;
  onEditProduct?: (product: Database["public"]["Tables"]["purchase"]["Insert"]) => void;
  productToEdit?: Database["public"]["Tables"]["purchase"]["Insert"] | null; // null 허용
  mode: "add" | "edit";
  purchasesLength: number; // 현재 상품 개수
};
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 최대 업로드 파일 크기 5MB

const PurchaseModal = ({
  isOpen,
  onClose,
  onAddProduct,
  onEditProduct,
  productToEdit,
  mode,
  purchasesLength
}: ProductModalProps) => {
  // 입력 폼 상태 관리
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    buy_link: "",
    image_url: "",
    post_id: "", // post_id 추가
  });

  const { title, description, buy_link, image_url, post_id } = formState;

  useEffect(() => {
    if (productToEdit) {
      // 수정 모드에서 데이터 초기화
      setFormState({
        title: productToEdit.title,
        description: productToEdit.description || "",
        buy_link: productToEdit.buy_link || "",
        image_url: productToEdit.image_url || "",
        post_id: productToEdit.post_id || "",
      });
    } else {
      // 추가 모드에서 초기 상태로 리셋
      setFormState({
        title: "",
        description: "",
        buy_link: "",
        image_url: "",
        post_id: "", // 기본값으로 설정
      });
    }
  }, [productToEdit]);

  // 입력 필드 값 변경 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value, // 모든 입력 값을 문자열로 처리
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
    const filePath = `purchase/${timestamp}.${extension}`;

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

  // 폼 초기화 함수
  const resetForm = () => {
    setFormState({
      title: "",
      description: "",
      buy_link: "",
      image_url: "",
      post_id: "",
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 5개 제한 확인
    if (mode === "add" && purchasesLength >= 5) {
      alert("상품은 최대 5개까지만 추가할 수 있습니다.");
      return;
    }

    // 필수 입력 항목 확인
    if (!title || !description || !buy_link || !image_url) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const product = { title, description, buy_link, image_url, post_id };
    if (mode === "add") {
      // 추가 모드
      onAddProduct({ ...product, id: genUniqueId() });
    } else if (mode === "edit" && onEditProduct) {
      // 수정 모드
      onEditProduct({ ...product, id: productToEdit?.id });
    }

    resetForm(); // 입력 폼 초기화
    onClose(); // 모달 닫기
  };

  // 모달 닫기 핸들러 (취소 버튼 클릭 시)
  const handleClose = () => {
    resetForm(); // 입력 폼 초기화
    onClose(); // 모달 닫기
  };

  // 모달이 닫혀 있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "상품 추가" : "상품 수정"}
        </h2>

        {/* 이미지 업로드 */}
        <div
          className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
          onClick={handleImageUpload}
        >
          {image_url ? (
            <div className="relative w-full h-full">
              <Image
                src={image_url}
                alt="Uploaded"
                layout="fill" // 부모 요소를 기준으로 채움
                objectFit="cover" // 이미지 비율 유지하며 영역을 꽉 채움
              />
            </div>
          ) : (
            <span className="text-gray-400 flex items-center justify-center h-full">
              + 추가
            </span>
          )}
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

        {/* 링크 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">상품 링크</label>
          <input
            type="url"
            name="buy_link"
            value={formState.buy_link || ""}
            onChange={handleInputChange}
            placeholder="상품 구매 링크를 입력해주세요."
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={handleClose} // 폼 초기화 및 모달 닫기
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            onClick={handleSubmit} // 데이터 저장 및 모달 닫기
          >
            {mode === "add" ? "추가 완료" : "수정 완료"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;