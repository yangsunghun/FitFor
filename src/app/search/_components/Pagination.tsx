import type { PostType } from "@/lib/types/post";

type PaginationProps = {
  data: { items: PostType[]; total: number } | undefined;
  page: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({ data, page, onPageChange }: PaginationProps) => {
  if (!data || data.total === 0) return null;

  const totalPages = Math.ceil(data.total / 10);

  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        이전
      </button>
      <span>
        페이지 {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
