import { useEffect, useState } from 'react';
import { AlertTriangle, Filter } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchAdminSosLogs } from '@/store/features/admin/sos/adminSos.thunk';
import { markResolved } from '@/store/features/admin/sos/adminSos.slice';
import { SosCard } from './SosCard';
import { SosCardSkeleton } from '../../../components/skeletons/SosCardSkeleton';
import { Pagination } from '@/components/Pagination';

type FilterValue = 'ALL' | 'OPEN' | 'RESOLVED';

const PAGE_SIZE = 5;
const FILTERS: FilterValue[] = ['ALL', 'OPEN', 'RESOLVED'];

export const SOSManagement = () => {
  const dispatch = useAppDispatch();
  const { logs, loading, totalCount } = useSelector(
    (state: RootState) => state.adminSos
  );

  const [filter, setFilter] = useState<FilterValue>('ALL');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchAdminSosLogs({
        page,
        status: filter === 'ALL' ? undefined : filter,
      })
    );
  }, [dispatch, page, filter]);

  const handleResolve = (id: string) => {
    dispatch(markResolved(id));
  };

  const openCount = logs.filter(item => item.status === 'OPEN').length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600 shadow-lg shadow-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  SOS Management
                </h1>
                <p className="text-slate-500 text-sm">
                  {openCount} active alert{openCount !== 1 ? 's' : ''} •{' '}
                  {totalCount} total
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center bg-white rounded-lg p-1 shadow-sm border border-slate-200">
              {FILTERS.map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    filter === status
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <SosCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map(log => (
              <SosCard key={log.id} log={log} onResolve={handleResolve} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && logs.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center mt-6">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-slate-900 font-medium">No alerts found</p>
            <p className="text-slate-500 text-sm mt-1">
              There are no {filter.toLowerCase()} alerts at the moment.
            </p>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
