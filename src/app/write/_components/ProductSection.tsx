import { Trash, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";

type ProductSectionProps = {
  purchases: { image_url?: string; title?: string }[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const ProductSection = ({ purchases, onAdd, onEdit, onDelete }: ProductSectionProps) => (
  <div className="space-y-6 pt-10">
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <span className="text-title2 font-bold text-text-04">상품정보 입력</span>
        <span className="text-title2 font-bold text-primary-default">*</span>
      </div>
      <p className="text-caption font-medium text-text-03">
        다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
      <button
        onClick={onAdd}
        className="flex h-32 w-32 flex-col items-center justify-center rounded-lg border border-line-02 text-text-03"
      >
        <UploadSimple size={24} />
      </button>

      {purchases.map((purchase, index) => (
        <div key={index} className="group relative h-32 w-32 cursor-pointer" onClick={() => onEdit(index)}>
          <div className="absolute inset-0 overflow-hidden rounded-lg border border-black">
            {purchase.image_url ? (
              <Image
                src={purchase.image_url}
                alt={purchase.title || "상품 이미지"}
                layout="fill"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <p className="text-sm text-gray-400">이미지 없음</p>
              </div>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg-01 text-text-03"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductSection;
