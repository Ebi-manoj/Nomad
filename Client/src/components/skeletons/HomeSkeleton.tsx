// src/components/HomeSkeleton.tsx
import { Skeleton } from './skeleton';
export const HomeSkeleton = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Hero section */}
      <Skeleton className="h-20 w-full rounded-lg" />

      {/* Content section: left form, right map */}
      <div className="flex gap-6 h-[400px]">
        {/* Left form skeleton */}
        <div className="flex-1 h-full rounded-md border border-gray-200 p-8 space-y-10">
          <Skeleton className="h-[10%] rounded-md" />
          <Skeleton className="h-[10%] rounded-md" />
          <Skeleton className="h-[10%] rounded-md" />
        </div>

        {/* Right map skeleton */}
        <Skeleton className="flex-1 h-full rounded-md" />
      </div>
    </div>
  );
};
