import { Skeleton } from './skeleton';

export const TableSkeleton = () => {
  // number of skeleton rows
  const rows = 5;

  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-22 rounded" />
            </div>
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-30 rounded" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-32 rounded" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-12 rounded" />
          </td>
        </tr>
      ))}
    </>
  );
};
