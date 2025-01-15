"use client";

import { usePurchases } from "@/lib/hooks/detail/usePurchases";
import type { Purchase } from "@/lib/types/post";
import Image from "next/image";

type PurchaseListProps = {
  postId: string;
};

const PurchaseList = ({ postId }: PurchaseListProps) => {
  const { purchases, isPending, isError } = usePurchases(postId);

  if (isPending) {
    return <p>스켈레톤</p>;
  }

  if (isError) {
    return <p>구매처 데이터를 가져오는 중 오류가 발생했습니다.</p>;
  }

  if (!purchases || purchases.length === 0) {
    return <p>등록된 구매처가 없습니다.</p>;
  }

  return (
    <>
      <p className="mb-4 text-title1 font-bold text-black">상품 정보</p>
      <ul className="grid grid-cols-4 gap-6">
        {purchases.map((purchase: Purchase) => (
          <li key={purchase.id} className="rounded-[0.5rem] p-4 shadow-lg">
            {purchase.image_url && (
              <div className="relative h-[11.25rem] w-full">
                <Image src={purchase.image_url} alt={purchase.title} fill={true} className="object-cover" />
              </div>
            )}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-title2 font-bold">{purchase.title}</p>
                <p className="text-title2 font-medium text-primary-default">{purchase.description}</p>
              </div>
              <div className="hidden">
                <strong>가격:</strong> {purchase.price ? `${purchase.price.toLocaleString()} 원` : "가격 정보 없음"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PurchaseList;
