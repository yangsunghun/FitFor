import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import { createClient } from "@/lib/utils/supabase/client";
import { CaretRight, Trash, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";

const supabase = createClient();

type ProductSectionProps = {
  purchases: { image_url?: string; title?: string }[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  isMissing?: boolean; // 필수 입력 경고 표시 여부
};

const ProductSection = ({ purchases, onAdd, onEdit, onDelete, isMissing }: ProductSectionProps) => {
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
        onDelete(index); // Supabase 없이 로컬 상태만 업데이트
        return;
      }

      const filePath = extractFilePath(imageUrl);

      // Supabase에서 파일 삭제
      const { error } = await supabase.storage.from("post-images").remove([filePath]);
      if (error) {
        alert("이미지 삭제에 실패했습니다.");
        return;
      }

      onDelete(index); // 상태 업데이트 (부모 컴포넌트에서 처리)
    } catch (error) {
      alert("이미지 삭제 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <Tablet>
        <div className="flex cursor-pointer items-center justify-between py-4" onClick={onAdd}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <p className="text-title2 font-medium text-text-04 mb:text-body">상품 정보 입력</p>
              <p className="text-title2 font-medium text-primary-default mb:text-body">*</p>
            </div>
            <span
              className={`font-medium mb:text-caption ${
                purchases.length > 0 ? "text-primary-default" : "text-text-03"
              }`}
            >
              {purchases.length > 0
                ? `${purchases.length}개의 상품이 추가되었습니다.`
                : "착용한 상품을 최소 한 가지 입력해 주세요."}
            </span>
          </div>
          <CaretRight size={20} className="text-text-03" />
        </div>
        {isMissing && <p className="text-body text-status-danger">상품 정보를 추가해주세요.</p>}
      </Tablet>

      <MinTablet>
        <div className="space-y-6 pt-10">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-title2 font-bold text-text-04">상품정보 입력</span>
              <span className="text-title2 font-bold text-primary-default">*</span>
            </div>
            <p className="text-caption text-text-03">착용한 상품의 이름과 구매 링크를 추가해보세요! (최대 5개)</p>
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
                <div className="group relative h-[6.75rem] w-[6.75rem] cursor-pointer" onClick={() => onEdit(index)}>
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
                <p className="mt-2 w-[6.75rem] truncate text-center text-caption text-text-04">
                  {purchase.title || "상품 상세 정보"}
                </p>
              </div>
            ))}
          </div>
          {/* 필수 입력 경고 메시지 */}
          {isMissing && <p className="text-body text-status-danger">상품 정보를 추가해주세요.</p>}
        </div>
      </MinTablet>
    </>
  );
};

export default ProductSection;
