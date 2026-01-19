'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SkipIcon from "@/assets/icons/skip.svg";
import SkipAllIcon from "@/assets/icons/skip_all.svg";
import clearParams from "@/app/_utils/clearNewTicketParams";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageChange(page: number) {
    const params = clearParams(new URLSearchParams(searchParams));
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-row items-center justify-end gap-4 pt-3">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className="px-3 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 cursor-pointer transition-colors"
        aria-label="First page"
      >
        <Image src={SkipAllIcon} alt="Skip to first page" className="w-3 h-3 rotate-180 pointer-events-none" />
      </button>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 cursor-pointer transition-colors"
        aria-label="Previous page"
      >
        <Image src={SkipIcon} alt="Go to previous page" className="w-3 h-3 rotate-180 pointer-events-none" />
      </button>
      <span className="px-4 text-sm text-neutral-100">
        {currentPage} de {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 cursor-pointer transition-colors"
        aria-label="Next page"
      >
        <Image src={SkipIcon} alt="Go to next page" className="w-3 h-3 pointer-events-none" />
      </button>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="px-3 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100/10 cursor-pointer transition-colors"
        aria-label="Last page"
      >
        <Image src={SkipAllIcon} alt="Skip to last page" className="w-3 h-3 pointer-events-none" />
      </button>
    </div>
  );
}

