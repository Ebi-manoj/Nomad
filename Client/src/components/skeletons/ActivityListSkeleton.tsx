import { Skeleton } from './skeleton';

export const ActivityListSkeleton = ({ items = 5 }: { items?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: items }).map((_, idx) => (
        <div key={idx} className="group bg-card border border-border rounded-lg">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-7 w-16" />
            </div>

            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Skeleton className="w-5 h-5 rounded-full" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3 w-10 mb-1" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              <Skeleton className="w-4 h-4" />

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Skeleton className="w-5 h-5 rounded-full" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3 w-10 mb-1" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border">
              <div className="flex items-center gap-4">
                <Skeleton className="h-3 w-24" />
                <div className="w-px h-3 bg-border" />
                <Skeleton className="h-3 w-24" />
                <div className="w-px h-3 bg-border" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
