import { Trash, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

type ProductSectionProps = {
  purchases: { image_url?: string; title?: string }[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const ProductSection = ({ purchases, onAdd, onEdit, onDelete }: ProductSectionProps) => {
  // Supabase에서 파일 경로 추출
  const extractFilePath = (imageUrl: string): string => {
    const bucketUrl = supabase.storage.from("post-images").getPublicUrl("").data.publicUrl;
    return imageUrl.replace(bucketUrl, ""); // Bucket URL을 제거해 파일 경로만 반환
  };

  // 삭제 핸들러 (Supabase와 연동)
  const handleDelete = async (index: number) => {
    try {
      const purchase = purchases[index];
      const imageUrl = purchase.image_url;

      if (!imageUrl) {
        console.warn("삭제할 이미지 URL이 없습니다.");
        onDelete(index); // Supabase 없이 로컬 상태만 업데이트
        return;
      }

      const filePath = extractFilePath(imageUrl);

      // Supabase에서 파일 삭제
      const { error } = await supabase.storage.from("post-images").remove([filePath]);
      if (error) {
        console.error("Supabase에서 이미지 삭제 실패:", error);
        alert("이미지 삭제에 실패했습니다.");
        return;
      }

      console.log(`이미지 삭제 성공: ${filePath}`);
      onDelete(index); // 상태 업데이트 (부모 컴포넌트에서 처리)
    } catch (error) {
      console.error("이미지 삭제 중 오류 발생:", error);
      alert("이미지 삭제 중 문제가 발생했습니다.");
    }
  };

  return (
  <div className="space-y-6 pt-10">
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <span className="text-title2 font-bold text-text-04">상품정보 입력</span>
        <span className="text-title2 font-bold text-primary-default">*</span>
      </div>
      <p className="text-caption text-text-03">
        다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
      </p>
    </div>
    <div className="flex gap-6">
      {/* 추가 버튼은 업로드된 이미지가 5개 미만일 때만 표시 */}
      {purchases.length < 5 && (
        <button
          onClick={onAdd}
          className="flex h-[6.75rem] w-[6.75rem] flex-col items-center justify-center rounded-lg border border-line-02 text-text-03"
        >
          <UploadSimple size={24} />
        </button>
      )}

      {/* 업로드된 이미지 리스트 */}
      {purchases.map((purchase, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* 이미지 영역 */}
          <div
            className="group relative h-[6.75rem] w-[6.75rem] cursor-pointer"
            onClick={() => onEdit(index)}
          >
            <div className="absolute inset-0 overflow-hidden rounded-lg border border-line-02">
              {purchase.image_url ? (
                <Image
                  src={purchase.image_url}
                  alt={purchase.title || "상품 이미지"}
                  layout="fill"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <p className="text-caption text-text-03">이미지 없음</p>
                </div>
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index); // Supabase와 연동된 삭제 핸들러 호출
                }}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg-01 text-text-03"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>

          {/* 상품 정보 영역 */}
          <p className="text-text-04 text-caption text-center mt-2 truncate w-[6.75rem]">
            {purchase.title || "상품 상세 정보"}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}

export default ProductSection;