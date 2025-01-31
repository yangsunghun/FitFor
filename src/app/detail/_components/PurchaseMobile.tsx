"use client";

import { usePurchases } from "@/lib/hooks/detail/usePurchases";
import type { Purchase } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

type PurchaseListProps = {
  postId: string;
};

const PurchaseMobile = ({ postId }: PurchaseListProps) => {
  const { purchases, isPending, isError } = usePurchases(postId);

  if (isPending) {
    return;
  }

  if (isError) {
    return <p>구매처 데이터를 가져오는 중 오류가 발생했습니다.</p>;
  }

  if (!purchases || purchases.length === 0) {
    return (
      <p className="w-full pb-[20px] pt-[30px] text-center text-body font-medium text-text-02">
        등록된 구매처가 없습니다.
      </p>
    );
  }

  return (
    <>
      <ul className="flex gap-[16px] overflow-auto px-[4.275%] py-[12px]">
        {purchases.map((purchase: Purchase) => (
          <li
            key={purchase.id}
            className="shadow-normal relative flex w-[256px] items-center gap-[12px] rounded-lg p-2"
          >
            {purchase.buy_link && (
              <Link href={purchase.buy_link} title={purchase.title} target="_blank" className="click-box z-10"></Link>
            )}
            {purchase.image_url && (
              <figure className="thumbnail aspect-square w-[48px] rounded-lg border bg-bg-02">
                <Image
                  src={purchase.image_url}
                  alt={purchase.title}
                  fill={true}
                  sizes="(max-width: 768px) 108px, 108px"
                  className="object-cover"
                />
              </figure>
            )}
            <div className="w-[calc(100%-60px)]">
              <p className="ellip1 text-body font-medium">{purchase.title}</p>
              <p className="ellip1 text-caption text-text-03">{purchase.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PurchaseMobile;
