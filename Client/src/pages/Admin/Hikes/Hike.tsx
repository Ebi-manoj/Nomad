import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/Pagination';
import type { GetAdminHikesResDTO } from '@/types/adminHike';
import { getAdminHikes } from '@/api/adminHike';
import { HikeCard } from './HikeCard';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebounce } from 'use-debounce';

type StatusFilter = 'all' | 'active' | 'completed' | 'cancelled';
const PAGE_SIZE = 5;

export const AdminHikesPage = () => {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hikeData, setHikeData] = useState<GetAdminHikesResDTO | undefined>();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHikes = async () => {
      setLoading(true);
      const statusParam = status === 'all' ? '' : status;
      const data = await getAdminHikes(
        page,
        statusParam,
        debouncedSearch,
        sort
      );
      if (data) {
        setHikeData(data);
      } else {
        setHikeData(undefined);
      }
      setLoading(false);
    };

    fetchHikes();
  }, [page, status, debouncedSearch, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort]);

  const filteredHikes = hikeData?.hikes ?? [];

  const totalPages = hikeData
    ? Math.max(1, Math.ceil(hikeData.total / PAGE_SIZE))
    : 1;

  const handleView = (id: string) => {
    navigate(`/admin/hikes/${id}`);
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950">
      <div className="max-w-5xl mx-auto p-4 sm:p-2">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Hike Logs
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track all user ride requests.
            </p>
          </div>

          {/* Status Filter Tabs + Search + Sort */}
          <div className="flex p-1 gap-2 w-full sm:w-auto overflow-x-auto items-center">
            <Input
              placeholder="Search pickup or destination"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-64"
            />
            <Select
              value={sort}
              onValueChange={v => setSort(v as 'newest' | 'oldest')}
            >
              <SelectTrigger className="w-36 cursor-pointer">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest" className="cursor-pointer">
                  Newest
                </SelectItem>
                <SelectItem value="oldest" className="cursor-pointer">
                  Oldest
                </SelectItem>
              </SelectContent>
            </Select>
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

        {/* Stats Summary (Optional Visual Aid) */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-3 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{hikeData?.total || 0}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Total
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-green-600">
              {hikeData?.hikeMetrics.active || 0}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Active
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {hikeData?.hikeMetrics.completed || 0}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Done
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-red-600">
              {hikeData?.hikeMetrics.cancelled || 0}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
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
          ) : filteredHikes.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/10">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-foreground">
                No hikes found
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try changing the status filter.
              </p>
            </div>
          ) : (
            filteredHikes.map(hike => (
              <HikeCard key={hike.id} hike={hike} onView={handleView} />
            ))
          )}
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
