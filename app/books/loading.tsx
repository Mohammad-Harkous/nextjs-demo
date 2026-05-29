import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonBookCard } from '@/components/ui/SkeletonBookCard';

export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-10 w-48 mb-8" />

      <Skeleton className="h-10 w-full max-w-lg rounded-lg mb-8" />

      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      <Skeleton className="h-4 w-32 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonBookCard key={i} />
        ))}
      </div>
    </div>
  );
}
