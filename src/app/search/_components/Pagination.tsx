"use client";

import { POSTS_PER_PAGE } from "@/lib/constants/constants";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import clsx from "clsx";

type PaginationProps = {
  Results?: { total: number };
  page: number;
  handlePageChange: (newPage: number) => void;
};

const Pagination = ({ Results, page, handlePageChange }: PaginationProps) => {
  if (!Results || Results.total === 0) return null;

  const totalPages = Math.ceil(Results.total / POSTS_PER_PAGE);

  const maxPagesToShow = 5; // 보여줄 페이지 번호 개수
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <div className="mt-16 flex items-center justify-center gap-1 tb:mt-6">
      {/* <button
        disabled={page === 1}
        onClick={() => handlePageChange(1)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretDoubleLeft size={16} weight="bold" className="tb:w-[13px]" />
      </button> */}

      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretLeft size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={clsx("flex h-8 w-8 items-center justify-center rounded-full text-body font-medium", {
            "bg-primary-default text-text-01": page === pageNumber,
            "text-text-04": page !== pageNumber
          })}
        >
          {pageNumber}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretRight size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      {/* <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretDoubleRight size={16} weight="bold" className="tb:w-[13px]" />
      </button> */}
    </div>
  );
};

export default Pagination;
