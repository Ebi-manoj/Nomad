import { Input } from '@/components/ui/input';
import { UserTable } from '@/components/UserTable';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import type { PaginationDTO } from '@/types/pagination';
import { fetchUsers } from '@/store/features/admin/users/usersSlice.thunk';

export const UserMangement = () => {
  const dispatch = useAppDispatch();
  const { totalPages } = useSelector((state: RootState) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 2;
  useEffect(() => {
    const fetch = setTimeout(async () => {
      try {
        const dto: PaginationDTO = { page: currentPage, limit, search };
        await dispatch(fetchUsers(dto));
      } catch (error) {}
    }, 400);
    return () => clearTimeout(fetch);
  }, [currentPage, search]);
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search users"
          className="pl-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <UserTable />
      {/* pagination */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            return (
              <Button
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className="cursor-pointer"
                key={i + 1}
              >
                {i + 1}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
