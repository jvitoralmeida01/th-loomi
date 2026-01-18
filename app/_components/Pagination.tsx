'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className="px-3 py-2 rounded-lg border border-glass-edge bg-neutral-100/5 text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 transition-colors"
        aria-label="Primeira página"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12L3 7L8 2M13 12L8 7L13 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-2 rounded-lg border border-glass-edge bg-neutral-100/5 text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 transition-colors"
        aria-label="Página anterior"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L5 7L10 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span className="px-4 py-2 text-sm text-neutral-100">
        {currentPage} de {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-2 rounded-lg border border-glass-edge bg-neutral-100/5 text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 transition-colors"
        aria-label="Próxima página"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L11 7L6 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="px-3 py-2 rounded-lg border border-glass-edge bg-neutral-100/5 text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 transition-colors"
        aria-label="Última página"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12L13 7L8 2M3 12L8 7L3 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

