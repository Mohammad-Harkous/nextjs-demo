'use client';

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Pagination from './Pagination';
import { Publisher } from '@/lib/data';

interface PublishersClientProps {
  publishers: Publisher[];
  bookCounts: Record<number, number>;
}

type SortField = 'name' | 'country' | 'foundedYear' | 'bookCount';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 5;

export default function PublishersClient({ publishers, bookCounts }: PublishersClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const sortField = (searchParams.get('sort') ?? 'name') as SortField;
  const sortDir = (searchParams.get('dir') ?? 'asc') as SortDir;
  const currentPage = Number(searchParams.get('page') ?? 1);

  function setSort(field: SortField) {
    const params = new URLSearchParams(searchParams.toString());
    if (sortField === field) {
      params.set('dir', sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sort', field);
      params.set('dir', 'asc');
    }
    params.delete('page');
    router.push(`/publishers?${params.toString()}`);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return publishers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
    );
  }, [publishers, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'country') cmp = a.country.localeCompare(b.country);
      else if (sortField === 'foundedYear') cmp = a.foundedYear - b.foundedYear;
      else if (sortField === 'bookCount') cmp = (bookCounts[a.id] ?? 0) - (bookCounts[b.id] ?? 0);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortField, sortDir, bookCounts]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function SortIndicator({ field }: { field: SortField }) {
    if (sortField !== field) return <span className="ml-1 text-zinc-400">↕</span>;
    return <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  const thClass = 'px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 select-none';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Publishers</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter by name or country..."
        className="mb-6 w-full max-w-md px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className={thClass} onClick={() => setSort('name')}>
                Name <SortIndicator field="name" />
              </th>
              <th className={thClass} onClick={() => setSort('country')}>
                Country <SortIndicator field="country" />
              </th>
              <th className={thClass} onClick={() => setSort('foundedYear')}>
                Founded <SortIndicator field="foundedYear" />
              </th>
              <th className={thClass} onClick={() => setSort('bookCount')}>
                Books <SortIndicator field="bookCount" />
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-zinc-500 dark:text-zinc-400">
                  No publishers found.
                </td>
              </tr>
            ) : (
              paginated.map((publisher) => (
                <tr key={publisher.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {publisher.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{publisher.country}</td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{publisher.foundedYear}</td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {bookCounts[publisher.id] ?? 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
