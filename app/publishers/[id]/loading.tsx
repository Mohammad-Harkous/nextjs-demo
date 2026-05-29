import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonBookCard } from '@/components/ui/SkeletonBookCard';

export default function PublisherDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-4 w-32 mb-6" />

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 mb-10 space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      <Skeleton className="h-8 w-48 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <SkeletonBookCard key={i} />
        ))}
      </div>
    </div>
  );
}
