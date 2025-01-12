"use client";

import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import { useRouter } from "next/navigation";

type PaginationProps = {
  Results?: { total: number };
};

const Pagination = ({ Results }: PaginationProps) => {
  const router = useRouter();
  const { query, page } = useSearchQuery();

  const handlePageChange = (newPage: number) => {
    router.push(`?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  if (!Results || Results.total === 0) return null;

  const totalPages = Math.ceil(Results.total / 10);

  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        이전
      </button>
      <span>
        페이지 {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
