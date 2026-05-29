import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonAuthorCard } from '@/components/ui/SkeletonAuthorCard';

export default function AuthorsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-10 w-48 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(4)].map((_, i) => (
          <SkeletonAuthorCard key={i} />
        ))}
      </div>
    </div>
  );
}
