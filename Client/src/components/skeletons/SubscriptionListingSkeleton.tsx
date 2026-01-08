import { Skeleton } from './skeleton';

export const SubscriptionListingSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border animate-pulse mb-4">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-80 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto" />

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-14 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="relative flex flex-col p-6 rounded-2xl border bg-white">
            <div className="mb-6">
              <Skeleton className="w-12 h-12 rounded-lg mb-6" />
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1 mb-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-5 w-32 rounded-full" />
            </div>

            <div className="flex-grow mb-8 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>

            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* Footer logos skeleton */}
      <div className="mt-20 border-t pt-10 text-center">
        <Skeleton className="h-4 w-64 mx-auto mb-4" />
        <div className="flex justify-center gap-6">
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};
