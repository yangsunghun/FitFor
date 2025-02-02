"use client";

import { POSTS_PER_PAGE } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import clsx from "clsx";

type PaginationProps = {
  Results?: { total: number };
};

const Pagination = ({ Results }: PaginationProps) => {
  const { page, handlePageChange } = useSearchQuery();

  if (!Results || Results.total === 0) return null;

  const totalPages = Math.ceil(Results.total / POSTS_PER_PAGE);

  const maxPagesToShow = 5; // 보여줄 페이지 번호 개수
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <div className="mt-16 flex justify-center gap-2 tb:mt-6">
      <button disabled={page === 1} onClick={() => handlePageChange(1)} className="disabled:opacity-50">
        <CaretDoubleLeft size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className="disabled:opacity-50">
        <CaretLeft size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={clsx("text-title2 tb:text-body", {
            "font-bold": page === pageNumber,
            "text-text-03": page !== pageNumber
          })}
        >
          {pageNumber}
        </button>
      ))}

      <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} className="disabled:opacity-50">
        <CaretRight size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="disabled:opacity-50"
      >
        <CaretDoubleRight size={16} weight="bold" className="tb:w-[13px]" />
      </button>
    </div>
  );
};

export default Pagination;
