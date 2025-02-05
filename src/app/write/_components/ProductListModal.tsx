"use client";

import { Button } from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import { CaretLeft, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import PurchaseSlider from "./PurchaseSlider";
import ProductCard from "./ProductCard";


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

          // 상품 정보가 없거나 이미지가 없을 때 EmptyProductBox 표시
          if (!product || !product.image_url) {
            return <ProductCard key={index} index={index} onClick={openAddSlider} />;
          }

          // 상품 정보가 있을 때 표시
          return (
            <div
              key={index}
              className="shadow-normal relative flex h-[115px] w-full cursor-pointer items-center overflow-hidden rounded-lg p-4"
              onClick={() => openEditSlider(product)}
            >
              <div className="flex items-start">
                <div className="h-[83px] w-[83px] flex-shrink-0 overflow-hidden rounded-md border border-[#e8e8e8]">
                  <Image src={product.image_url} alt={product.title} width={83} height={83} className="object-fill" />
                </div>

                <div className="ml-4 flex flex-col justify-start overflow-hidden">
                  <span className="truncate font-medium text-text-04">{product.title}</span>
                  {product.description ? (
                    <>
                      <span className="truncate text-caption text-text-03 mt-[4px]">{product.description}</span>
                      <span className="truncate text-caption text-text-03 mt-[16px]">{product.buy_link}</span>
                    </>
                  ) : (
                    <span className="truncate text-caption text-text-03 mt-[40px]">{product.buy_link}</span>
                  )}
                </div>
              </div>

              <button
                className="absolute bottom-4 right-2 flex h-6 w-6 items-center justify-center text-text-03"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProduct(product.id);
                }}
              >
                <Trash size={16} />
              </button>
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