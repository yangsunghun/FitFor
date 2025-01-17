import Image from "next/image";
import { UploadSimple } from "@phosphor-icons/react";

type ProductSectionProps = {
  purchases: { image_url?: string; title?: string }[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const ProductSection = ({
  purchases,
  onAdd,
  onEdit,
  onDelete,
}: ProductSectionProps) => (
  <div className="space-y-6 pt-10">
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <span className="text-title2 font-bold text-text-04">상품정보 입력</span>
        <span className="text-title2 font-bold text-primary-default">*</span>
      </div>
      <p className="text-caption text-text-03 font-medium">
        다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
        
      <button
        onClick={onAdd}
        className="w-32 h-32 flex flex-col items-center justify-center border border-line-02 rounded-lg text-text-03"
      >
        <UploadSimple size={24} />
      </button>

      {purchases.map((purchase, index) => (
        <div key={index} className="relative w-32 h-32">
          <button
            onClick={() => onEdit(index)}
            className="absolute inset-0 border border-black rounded-lg overflow-hidden"
          >
            {purchase.image_url ? (
              <Image
                src={purchase.image_url}
                alt={purchase.title || "상품 이미지"}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <p className="text-gray-400 text-sm">이미지 없음</p>
              </div>
            )}
          </button>
          <button
            onClick={() => onDelete(index)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10"
            title="삭제"
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ProductSection;