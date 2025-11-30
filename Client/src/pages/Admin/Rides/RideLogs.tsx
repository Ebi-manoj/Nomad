import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/Pagination';
import type { GetAdminRidesResDTO } from '@/types/adminRide';
import { getAdminRides } from '@/api/adminRide';
import { RideCard } from './RideCard';

type StatusFilter = 'all' | 'active' | 'completed' | 'cancelled';
const PAGE_SIZE = 5;

export const AdminRideLogsPage = () => {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rideData, setRideData] = useState<GetAdminRidesResDTO | undefined>();

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      const statusParam = status === 'all' ? '' : status;
      const data = await getAdminRides(page, statusParam);
      if (data) {
        setRideData(data);
      } else {
        setRideData(undefined);
      }
      setLoading(false);
    };

    fetchRides();
  }, [page, status]);

  const filteredRides = rideData?.rides ?? [];

  const totalPages = rideData
    ? Math.max(1, Math.ceil(rideData.total / PAGE_SIZE))
    : 1;

  const handleView = (id: string) => {
    console.log(`Viewing ride ${id}`);
  };

  const rideMetrics = rideData?.rideMetrics;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-2">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Ride Logs
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor user ride activities and vehicle details.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex p-1  rounded-lg   gap-1 w-full sm:w-auto overflow-x-auto">
            {(
              ['all', 'active', 'completed', 'cancelled'] as StatusFilter[]
            ).map(s => (
              <Button
                key={s}
                size="sm"
                variant={status === s ? 'default' : 'ghost'}
                className={`capitalize whitespace-nowrap cursor-pointer ${
                  status === s ? 'shadow-sm' : 'text-muted-foreground'
                }`}
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{rideData?.total || 0}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Total
            </span>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-green-600">
              {rideMetrics?.active || 0}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Active
            </span>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {rideMetrics?.completed || 0}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Completed
            </span>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-red-600">
              {rideMetrics?.cancelled || 0}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Cancelled
            </span>
          </div>
        </div>

        {/* List Content */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">
                Loading records...
              </p>
            </div>
          ) : filteredRides.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/10">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-foreground">
                No rides found
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try changing the status filter.
              </p>
            </div>
          ) : (
            filteredRides.map(ride => (
              <RideCard key={ride.id} ride={ride} onView={handleView} />
            ))
          )}
        </div>

        {rideData && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};
