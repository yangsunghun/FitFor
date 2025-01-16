"use client";

import { usePurchases } from "@/lib/hooks/detail/usePurchases";
import type { Purchase } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

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
          <li key={purchase.id} className="relative">
            {purchase.buy_link && <Link href={purchase.buy_link} title={purchase.title}></Link>}
            {purchase.image_url && (
              <figure className="thumbnail aspect-square w-full rounded-lg border border-line-02">
                <Image src={purchase.image_url} alt={purchase.title} fill={true} className="object-cover" />
              </figure>
            )}
            <div className="mt-4">
              <p className="ellip1 text-title2 font-bold">{purchase.title}</p>
              <p className="ellip1 text-title2 font-medium text-text-03">{purchase.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PurchaseList;
