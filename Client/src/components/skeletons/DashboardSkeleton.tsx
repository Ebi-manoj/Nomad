import { Skeleton } from './skeleton';

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-8 w-80 mb-2" />
          <Skeleton className="h-5 w-[28rem]" />
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl p-6 bg-white shadow-lg border">
              <div className="mb-2 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-24 mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-56 mb-4" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-56 mb-4" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-56 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <Skeleton className="h-5 w-10 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-56 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border">
                  <div className="flex items-start gap-3 mb-2">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-24 mb-2" />
                      <Skeleton className="h-4 w-52" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-3 w-14" />
                      <Skeleton className="h-3 w-14" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl p-6 shadow-lg border bg-white">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
            <div className="rounded-2xl p-6 shadow-lg border bg-white">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-3 rounded-xl text-center border">
                    <Skeleton className="h-8 w-8 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-3 w-24 mx-auto mb-1" />
                    <Skeleton className="h-2.5 w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 shadow-lg border bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div>
                <Skeleton className="h-3 w-24 mb-2" />
                <Skeleton className="h-8 w-40" />
              </div>
            </div>
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="rounded-2xl p-8 shadow-lg border bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div>
                <Skeleton className="h-3 w-24 mb-2" />
                <Skeleton className="h-8 w-40" />
              </div>
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
};
