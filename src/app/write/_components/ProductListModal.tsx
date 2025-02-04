"use client";

import { Button } from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import { CaretLeft, Plus, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import PurchaseSlider from "./PurchaseSlider";

// Product 타입 정의 (상품 데이터 구조)
type Product = {
  id: string;
  title: string;
  image_url: string;
  post_id: string;
  description: string; // 추가
  buy_link: string; // 추가
};

const initialProducts: Product[] = [];

// ProductListModal 컴포넌트 Props 타입 정의
type ProductListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
};

const ProductListModal = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}: ProductListModalProps) => {
  // 슬라이더 모달 오픈 여부, 모드("add" 또는 "edit") 및 현재 수정할 상품 상태 관리
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [sliderMode, setSliderMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // 추가 모드로 슬라이더 오픈
  const openAddSlider = () => {
    setSliderMode("add");
    setCurrentProduct(null);
    setIsSliderOpen(true);
  };

  // 수정 모드로 슬라이더 오픈 (리스트 아이템 클릭 시)
  const openEditSlider = (product: Product) => {
    setSliderMode("edit");
    setCurrentProduct(product);
    setIsSliderOpen(true);
  };

  // 슬라이더에서 제출 시 처리 (추가/수정 구분)
  const handleSliderSubmit = (product: Partial<Product>) => {
    if (sliderMode === "add") {
      const newProduct: Product = {
        ...product,
        id: crypto.randomUUID(),
        post_id: ""
      } as Product;
      onAddProduct(newProduct);
    } else if (currentProduct) {
      const editedProduct: Product = {
        ...currentProduct,
        ...product
      };
      onEditProduct(editedProduct);
    }
    setIsSliderOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full flex-col bg-bg-01 p-8 mb:p-4">
      <div className="flex-start flex items-center gap-2">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center tb:h-10">
          <button className="hidden items-center justify-center tb:inline-flex" onClick={onClose}>
            <CaretLeft size={24} className="text-text-04" />
          </button>
        </div>

        {/* 제목 */}
        <p className="text-subtitle font-bold leading-[150%] text-text-04 mb:text-title2">상품 정보</p>
      </div>

      <p className="text-title mt-6 text-blue-600 mb:text-body">아래 빈 박스를 터치해 정보를 입력해 주세요.</p>

      <div className="mx-auto flex w-full max-w-md flex-col gap-6 pt-8 mb:pt-4">
        {Array.from({ length: 4 }).map((_, index) => {
          const product = products[index];

          return (
            <div
              key={index}
              className="shadow-normal relative flex h-[115px] w-full cursor-pointer items-center overflow-hidden rounded-lg p-4"
              onClick={() => (product ? openEditSlider(product) : openAddSlider())}
            >
              <div className="flex items-start">
                {/* 이미지 섹션 */}
                <div className="h-[83px] w-[83px] flex-shrink-0 overflow-hidden rounded-md border border-[#e8e8e8]">
                  {product?.image_url ? (
                    <Image src={product.image_url} alt={product.title} width={83} height={83} className="object-fill" />
                  ) : (
                    <div className="h-full w-full bg-neutral-100" />
                  )}
                </div>

                {/* 정보 섹션 */}
                <div className="ml-4 flex flex-col justify-start overflow-hidden">
                  {product ? (
                    <>
                      {/* 제목: 상단 여백 없이 배치 */}
                      <span className="mt-0 truncate font-medium text-text-04">{product.title}</span>
                      {product.description ? (
                        <>
                          {/* 제목과 설명 사이 4px */}
                          <span className="truncate text-caption font-medium text-text-03" style={{ marginTop: "4px" }}>
                            {product.description}
                          </span>
                          {/* 설명과 구매 링크 사이 16px */}
                          <span
                            className="truncate text-caption font-medium text-text-03"
                            style={{ marginTop: "16px" }}
                          >
                            {product.buy_link}
                          </span>
                        </>
                      ) : (
                        // 설명이 없으면 제목과 구매 링크 사이 40px
                        <span className="truncate text-caption font-medium text-text-03" style={{ marginTop: "40px" }}>
                          {product.buy_link}
                        </span>
                      )}
                    </>
                  ) : (
                    // product가 없을 때는 placeholder 3개 표시 (gap 8px 적용)
                    <div className="flex flex-col gap-2">
                      <div className="h-[27px] w-full rounded-sm bg-neutral-100" />
                      <div className="h-5 w-full rounded-sm bg-neutral-100" />
                      <div className="h-5 w-full rounded-sm bg-neutral-100" />
                    </div>
                  )}
                </div>
              </div>

              {product && (
                <button
                  className="absolute bottom-4 right-2 flex h-6 w-6 items-center justify-center text-text-03"
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 이벤트 버블링 방지
                    onDeleteProduct(product.id);
                  }}
                >
                  <Trash size={16} />
                </button>
              )}

              {/* 빈 박스일 경우 플러스 아이콘과 텍스트 표시 */}
              {!product && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#464653]">
                    <Plus size={18} className="text-white" />
                  </div>
                  <span className="mt-2 text-[13px] font-medium text-[#1a1a1a]">{`상품 ${index + 1}`}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* 저장하기 버튼 */}
        <Button
          variant={products.length === 0 ? "disabled" : "primary"}
          className="mt-[5px] w-full"
          onClick={onClose}
          disabled={products.length === 0}
        >
          저장하기
        </Button>
      </div>

      {/* 슬라이더 컴포넌트 */}
      {isSliderOpen && (
        <SlideOver
          title={sliderMode === "add" ? "상품 정보 입력" : "상품 정보 수정"}
          onClose={() => setIsSliderOpen(false)}
        >
          <PurchaseSlider
            isOpen={isSliderOpen}
            onClose={() => setIsSliderOpen(false)}
            onSubmit={handleSliderSubmit}
            productToEdit={currentProduct}
            mode={sliderMode}
          />
        </SlideOver>
      )}
    </div>
  );
};

export default ProductListModal;
