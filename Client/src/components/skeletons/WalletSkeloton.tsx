import { Skeleton } from './skeleton';

export const WalletSkelton = () => (
  <div className="space-y-3">
    {[...Array(4)].map((_, idx) => (
      <div
        key={idx}
        className="p-4 border border-border bg-card rounded-lg animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
            </div>
          </div>
          <Skeleton className="h-5 w-20 rounded" />
        </div>
      </div>
    ))}
  </div>
);
