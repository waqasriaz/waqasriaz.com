"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useBlogLoading } from "@/contexts/BlogLoadingContext";

interface PaginationProps {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function Pagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startLoading } = useBlogLoading();

  if (pagination.totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    startLoading();
    router.push(`/blog?${params.toString()}`);
  };

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(
    1,
    pagination.page - Math.floor(maxVisiblePages / 2)
  );
  const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => goToPage(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => goToPage(1)}
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-slate-400">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-10 h-10 rounded-xl font-medium transition-colors ${
            page === pagination.page
              ? "bg-[#5b21b6] text-white"
              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < pagination.totalPages && (
        <>
          {endPage < pagination.totalPages - 1 && (
            <span className="px-2 text-slate-400">...</span>
          )}
          <button
            onClick={() => goToPage(pagination.totalPages)}
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            {pagination.totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => goToPage(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
