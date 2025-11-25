import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/dateFormater';
import { Calendar, Eye, MapPin, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { GetHikesResDTO } from '@/types/hike';
import { getHikes } from '@/api/hike';
import { Pagination } from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';

type StatusFilter = 'all' | 'active' | 'completed' | 'cancelled';

const PAGE_SIZE = 2;

export const HikeLogs = () => {
  const [hikeData, setHikeData] = useState<GetHikesResDTO | undefined>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHikes = async () => {
      setLoading(true);
      const statusParam = status === 'all' ? '' : status;
      const data = await getHikes(page, statusParam);
      if (data) setHikeData(data);
      setLoading(false);
    };
    fetchHikes();
  }, [page, status]);

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

  const totalPages = hikeData
    ? Math.max(1, Math.ceil(hikeData.total / PAGE_SIZE))
    : 1;

  if (!hikeData && !loading) return null;

  const handleView = (id: string) => {
    navigate(`/hike/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Hike Logs
            </h1>
            {hikeData && (
              <p className="text-sm text-muted-foreground mt-1">
                {hikeData.total} {hikeData.total === 1 ? 'record' : 'records'}
              </p>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(
              ['all', 'cancelled', 'active', 'completed'] as StatusFilter[]
            ).map(s => (
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

        {/* Compact Hikes List */}
        <div className="space-y-2">
          {loading && (
            <p className="text-center text-sm text-muted-foreground">
              Loading hikes...
            </p>
          )}

          {!loading && hikeData && hikeData.hikes.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No hikes found for this filter.
            </p>
          )}

          {!loading &&
            hikeData &&
            hikeData.hikes.map(hike => (
              <div
                key={hike.id}
                className="group bg-card border border-border rounded-lg hover:border-foreground transition-all duration-200 hover:shadow-sm"
              >
                <div className="p-3">
                  {/* Top Row - Status, Date, Actions */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(hike.status)}`}>
                        {hike.status.toUpperCase()}
                      </Badge>
                      <span className="flex items-center text-muted-foreground text-xs gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(hike.createdAt)}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleView(hike.id)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
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
                          {hike.pickupAddress}
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
                          {hike.destinationAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details Row - Compact Grid */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                          Distance:
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {hike.totalDistance} km
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border"></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                          Seats:
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {hike.seatsRequested}
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border"></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                          Helmet:
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {hike.hasHelmet ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {hike.bookingId?.slice(-8)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {hikeData && totalPages > 1 && (
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
