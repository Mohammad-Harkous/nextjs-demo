import { Skeleton } from '@/components/ui/skeleton';

export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-10 w-48 mb-8" />

      <Skeleton className="h-10 w-80 rounded-lg mb-6" />

      <div className="overflow-hidden rounded-lg shadow">
        <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 flex gap-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
        <div className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-6 py-4 flex gap-8 items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="ml-auto h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
