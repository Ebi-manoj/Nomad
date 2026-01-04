import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/Pagination';
import { formatDate } from '@/utils/dateFormater';
import { Calendar, Eye, MapPin, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { GetRidesResDTO } from '@/types/ride';
import { getRides } from '@/api/ride';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

type StatusFilter = 'all' | 'active' | 'completed' | 'cancelled';

const PAGE_SIZE = 10;

export const RideLogs = () => {
  const [rideData, setRideData] = useState<GetRidesResDTO | undefined>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      const statusParam = status === 'all' ? '' : status;
      const data = await getRides(page, statusParam, debouncedSearch);
      if (data) setRideData(data);
      setLoading(false);
    };
    fetchRides();
  }, [page, status, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cancelled':
        return 'bg-red-500 text-white ';
      case 'completed':
        return 'bg-green-500 text-white ';
      case 'active':
        return 'bg-yellow-500 text-white ';
      default:
        return 'bg-gray-100 text-gray-800 ';
    }
  };

  const totalPages = rideData
    ? Math.max(1, Math.ceil(rideData.total / PAGE_SIZE))
    : 1;

  if (!rideData && !loading) return null;

  const handleView = (id: string) => {
    navigate(`/ride/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Ride Logs
            </h1>
            {rideData && (
              <p className="text-sm text-muted-foreground mt-1">
                {rideData.total} {rideData.total === 1 ? 'record' : 'records'}
              </p>
            )}
          </div>

          {/* Status Filter + Search */}
          <div className="flex gap-2 items-center">
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search pickup or destination"
              className="w-64"
            />
            {(['all', 'active', 'completed'] as StatusFilter[]).map(s => (
              <Button
                key={s}
                size="sm"
                variant={status === s ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Compact Rides List */}
        <div className="space-y-2">
          {loading && (
            <p className="text-center text-sm text-muted-foreground">
              Loading rides...
            </p>
          )}

          {!loading && rideData && rideData.rides.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No rides found for this filter.
            </p>
          )}

          {!loading &&
            rideData &&
            rideData.rides.map(ride => (
              <div
                key={ride.id}
                className="group bg-card border border-border rounded-lg hover:border-foreground transition-all duration-200 hover:shadow-sm"
              >
                <div className="p-3">
                  {/* Top Row - Status, Date */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(ride.status)}`}>
                        {ride.status.toUpperCase()}
                      </Badge>
                      <span className="flex items-center text-muted-foreground text-xs gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(ride.createdAt)}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleView(ride.id)}
                    >
                      <Eye className="w-3 h-3 mr-1 " />
                      View
                    </Button>
                  </div>

                  {/* Route Information - Compact Horizontal Layout */}
                  <div className="flex items-center gap-3 mb-2.5">
                    {/* Pickup */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-background rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground leading-none mb-0.5">
                          From
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {ride.pickupAddress}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 px-2">
                      <MoveRight />
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-2.5 h-2.5 text-background" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground leading-none mb-0.5">
                          To
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {ride.destinationAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details Row - includes vehicle info and cost sharing */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-border">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-semibold text-foreground">
                          {ride.totalDistance} km
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground">
                          Seats Issued:
                        </span>
                        <span className="font-semibold text-foreground">
                          {ride.seatsAvailable}
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground">Vehicle:</span>
                        <span className="font-semibold text-foreground">
                          {ride.vehicleType.toUpperCase()} • {ride.vehicleModel}
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground">Number:</span>
                        <span className="font-semibold text-foreground">
                          {ride.vehicleNumber}
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground">
                          Cost sharing:
                        </span>
                        <span className="font-semibold text-foreground">
                          ₹{ride.costSharing}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
