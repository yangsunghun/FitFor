import { Plus } from "@phosphor-icons/react";

type ProductCardProps = {
  index: number;
  onClick: () => void;
};

const ProductCard = ({ index, onClick }: ProductCardProps) => {
  return (
    <div
      className="shadow-normal relative flex h-[115px] w-full cursor-pointer items-center overflow-hidden rounded-lg p-4"
      onClick={onClick}
    >
      {/* 이미지와 텍스트 placeholder */}
      <div className="flex items-start w-full">
        <div className="h-[83px] w-[83px] flex-shrink-0 overflow-hidden rounded-md border border-[#e8e8e8] bg-neutral-100" />
        <div className="ml-4 flex flex-col gap-2 flex-1">
          <div className="h-[27px] w-full rounded-sm bg-neutral-100" />
          <div className="h-5 w-full rounded-sm bg-neutral-100" />
          <div className="h-5 w-full rounded-sm bg-neutral-100" />
        </div>
      </div>

      {/* 오버레이 (아이콘과 텍스트만 표시) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#464653] z-10">
          <Plus size={18} className="text-white" />
        </div>
        <span className="mt-2 text-[13px] font-medium text-[#1a1a1a] z-10">{`상품 ${index + 1}`}</span>
      </div>
    </div>
  );
};

export default ProductCard;