'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        Previous
      </button>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
