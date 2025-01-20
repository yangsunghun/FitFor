"use client";

import ModalItem from "@/components/ui/Modal";
import type { Database } from "@/lib/types/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";

const genUniqueId = () => {
  return crypto.randomUUID(); // 고유 ID 생성
};

type PurchaseModalProps = {
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
}: PurchaseModalProps) => {
  // 입력 폼 상태 관리
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    buy_link: "",
    image_url: "",
    post_id: "" // post_id 추가
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]); // File 객체 관리
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 미리보기 URL 관리
  const { title, description, buy_link, image_url, post_id } = formState;

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
      setPreviewUrls(productToEdit.image_url ? [productToEdit.image_url] : []);
    } else {
      // 추가 모드에서 초기 상태로 리셋
      resetForm();
    }
  }, [productToEdit]);

  // 입력 필드 값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value // 모든 입력 값을 문자열로 처리
    }));
  };
  const handleImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]; // 첫 번째 파일만 처리
  
      if (!file) return; // 파일이 없으면 종료
  
      if (file.size > MAX_FILE_SIZE) {
        alert(`최대 5MB를 초과하는 파일은 업로드할 수 없습니다. : ${file.name}`);
        return;
      }
  
      const preview = URL.createObjectURL(file); // 미리보기 URL 생성
      setImageFiles([file]); // 단일 파일 배열로 상태 설정
      setPreviewUrls([preview]); // 단일 미리보기 URL 설정
      setFormState((prev) => ({ ...prev, image_url: preview })); // 폼 상태 업데이트
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
      post_id: ""
    });
    setImageFiles([]);
    setPreviewUrls([]);
  };

  // 로컬 저장 및 상위로 데이터 전달
  const handleLocalSubmit = () => {
        // 5개 제한 확인
        if (mode === "add" && purchasesLength >= 5) {
          alert("상품은 최대 5개까지만 추가할 수 있습니다.");
          return;
        }
    if (!formState.title || !formState.image_url) {
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
    <ModalItem isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-xl mb-4 font-bold">{mode === "add" ? "상품 추가" : "상품 수정"}</h2>

      {/* 이미지 업로드 */}
      <div
        className="h-[6.75rem] w-[6.75rem] cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-100"
        onClick={handleImageUpload} // 필요한 인수 전달
      >
        {image_url ? (
          <div className="relative h-full w-full">
            <Image
              src={image_url}
              alt="Uploaded"
              layout="fill" // 부모 요소를 기준으로 채움
              objectFit="cover" // 이미지 비율 유지하며 영역을 꽉 채움
            />
          </div>
        ) : (
          <span className="flex h-full items-center justify-center text-gray-400">+ 추가</span>
        )}
      </div>

      {/* 상품명 */}
      <div className="mb-4">
        <label className="mb-2 block font-bold">상품명</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          placeholder="상품명을 입력해주세요."
          className="w-full rounded-md border p-2"
        />
      </div>

      {/* 설명 */}
      <div className="mb-4">
        <label className="mb-2 block font-bold">설명</label>
        <textarea
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="상품의 설명을 작성해주세요."
          className="w-full resize-none rounded-md border p-2"
          rows={2}
        ></textarea>
      </div>

      {/* 링크 */}
      <div className="mb-4">
        <label className="mb-2 block font-bold">상품 링크</label>
        <input
          type="url"
          name="buy_link"
          value={formState.buy_link || ""}
          onChange={handleInputChange}
          placeholder="상품 구매 링크를 입력해주세요."
          className="w-full rounded-md border p-2"
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-4">
        <button
          className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
          onClick={handleClose} // 폼 초기화 및 모달 닫기
        >
          취소
        </button>
        <button
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          onClick={handleLocalSubmit} // 데이터 저장 및 모달 닫기
        >
          {mode === "add" ? "추가 완료" : "수정 완료"}
        </button>
      </div>
    </ModalItem>
  );
};

export default PurchaseModal;
