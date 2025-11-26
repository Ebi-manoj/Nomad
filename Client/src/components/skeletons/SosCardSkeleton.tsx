export const SosCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-3 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-slate-200 rounded w-3/4" />
              <div className="h-2 bg-slate-100 rounded w-1/2" />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200" />
              <div className="h-3 bg-slate-200 rounded w-40" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200" />
              <div className="h-3 bg-slate-200 rounded w-32" />
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="space-y-2 w-32">
              <div className="h-2 bg-slate-200 rounded w-2/3" />
              <div className="h-3 bg-slate-200 rounded w-full" />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            <div className="h-10 bg-slate-200 rounded-lg flex-1" />
            <div className="h-10 bg-slate-200 rounded-lg flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
