"use client";

import { POSTS_PER_PAGE } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import { useRouter } from "next/navigation";

type PaginationProps = {
  Results?: { total: number };
};

const Pagination = ({ Results }: PaginationProps) => {
  const router = useRouter();
  const { query, page, tags, sort, encodeTagsForUrl } = useSearchQuery();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("page", String(newPage));
    params.set("category", encodeTagsForUrl(tags));
    params.set("sort", sort);

    router.push(`/search?${params.toString()}`);
  };

  if (!Results || Results.total === 0) return null;

  const totalPages = Math.ceil(Results.total / POSTS_PER_PAGE);

  const maxPagesToShow = 5; // 보여줄 페이지 번호 개수
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        처음
      </button>

      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        이전
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`rounded px-4 py-2 ${page === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        다음
      </button>

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        끝
      </button>
    </div>
  );
};

export default Pagination;
