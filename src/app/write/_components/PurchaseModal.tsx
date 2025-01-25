"use client";

import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { Image as ImageIcon, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";

const supabase = createClient();
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

  const { title, description, buy_link, image_url, post_id } = formState;

  // 로딩 상태 추가
  const [loading, setLoading] = useState(false);

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

  // 입력 필드 값 변경 처리
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value // 모든 입력 값을 문자열로 처리
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
    const { error } = await supabase.storage.from("post-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

    if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);

    // 업로드된 이미지의 공개 URL 반환
    const { publicUrl } = supabase.storage.from("post-images").getPublicUrl(filePath).data;

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
        setLoading(true); // 로딩 상태 활성화
        try {
          const url = await uploadImage(file); // 이미지 업로드
          setFormState((prevState) => ({ ...prevState, image_url: url }));
        } catch (error: any) {
          alert(error.message); // 에러 알림
        } finally {
          setLoading(false); // 로딩 상태 비활성화
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
      post_id: ""
    });
  };

  // Supabase에서 이미지 파일 경로 추출
  const extractFilePath = (imageUrl: string): string => {
    const bucketUrl = supabase.storage.from("post-images").getPublicUrl("").data.publicUrl;
    return imageUrl.replace(bucketUrl, ""); // Bucket URL을 제거해 파일 경로만 반환
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = async () => {
    try {
      if (!image_url) {
        alert("삭제할 이미지가 없습니다.");
        return;
      }

      const filePath = extractFilePath(image_url);

      // Supabase에서 이미지 삭제
      const { error } = await supabase.storage.from("post-images").remove([filePath]);
      if (error) {
        console.error("Supabase에서 이미지 삭제 실패:", error);
        alert("이미지 삭제에 실패했습니다.");
        return;
      }

      // 이미지 URL 제거
      setFormState((prevState) => ({ ...prevState, image_url: "" }));
    } catch (error) {
      console.error("이미지 삭제 중 오류 발생:", error);
      alert("이미지 삭제 중 문제가 발생했습니다.");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 5개 제한 확인
    if (mode === "add" && purchasesLength >= 5) {
      alert("상품은 최대 5개까지만 추가할 수 있습니다.");
      return;
    }

    // 필수 입력 항목 확인
    if (!title || !image_url) {
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
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <span className="text-title2 font-bold text-text-04">게시물 이미지</span>
          <span className="text-title2 font-bold text-primary-default">*</span>
        </div>

        {/* 이미지 업로드 */}
        <div className="flex items-start gap-6">
          {/* 이미지 영역 */}
          <div className="relative h-[6.75rem] w-[6.75rem] overflow-hidden rounded-lg border border-bg-02 bg-bg-02">
            {loading ? (
              <div className="flex h-full w-full items-center justify-center bg-bg-03">
                <span className="text-caption font-medium text-text-02">이미지 업로드 중...</span>
              </div>
            ) : image_url ? (
              <>
                <Image
                  src={image_url}
                  alt="Uploaded"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <button
                  onClick={handleDeleteImage}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg-01 text-text-03"
                >
                  <Trash size={16} />
                </button>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon size={24} className="text-text-02" />
              </div>
            )}
          </div>

          {/* 이미지 업로드 버튼과 설명 */}
          <div className="lex mt-[3px] flex-col items-start justify-start gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-body text-text-03">추천 사이즈 : OOO x OOO</p>
              <p className="text-body text-text-03">JPG, PNG. 최대 5MB</p>
            </div>
            <button
              className="mt-4 h-9 rounded-lg bg-bg-03 px-3 py-1 text-text-01 hover:bg-gray-800"
              onClick={handleImageUpload}
              disabled={loading} // 로딩 중일 때 버튼 비활성화
            >
              {loading ? "업로드 중..." : "이미지 업로드"}
            </button>
          </div>
        </div>
      </div>

      {/* 상품명 */}
      <div className="w-[30vw] max-w-full space-y-2 pt-6">
        <label className="block text-title2 font-bold">상품명</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          placeholder="상품명을 입력해주세요."
          className="w-full rounded-md bg-bg-02 p-4 focus:outline-none"
        />
      </div>

      {/* 브랜드명 */}
      <div className="space-y-2 pt-6">
        <label className="block text-title2 font-bold text-text-04">브랜드명</label>
        <input
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="브랜드명을 작성해주세요."
          className="w-full rounded-md bg-bg-02 p-4"
        />
      </div>

      {/* 링크 */}
      <div className="space-y-2 pt-6">
        <label className="block text-title2 font-bold focus:outline-none">상품 링크</label>
        <input
          type="url"
          name="buy_link"
          value={formState.buy_link || ""}
          onChange={handleInputChange}
          placeholder="예시 - http://naver.com"
          className="text-title-02 w-full rounded-md bg-bg-02 p-4 focus:outline-none"
        />
      </div>

      {/* 버튼 */}
      <div className="pt-10">
        {/* 완료 버튼 */}
        <Button
          variant={title && image_url ? "secondary" : "disabled"} // 입력값에 따라 variant 변경
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!title || !image_url} // 비활성화 조건 추가
        >
          {mode === "add" ? "완료" : "수정하기"}
        </Button>
      </div>
    </ModalItem>
  );
};

export default PurchaseModal;
