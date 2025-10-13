import { DocumentTable } from '@/components/documentFields';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchAllDocs } from '@/store/features/admin/documents/adminDoc.thunk';
import type { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function DocumentVerification() {
  const [filters, setFilters] = useState({
    q: '',
    type: 'All',
    status: 'All',
  });
  const dispatch = useAppDispatch();
  const { documents } = useSelector((state: RootState) => state.adminDocs);
  console.log(documents);

  useEffect(() => {
    dispatch(fetchAllDocs({ page: 1 }));
  }, []);

  // Dummy actions
  const handleVerify = (id: string) => alert(`Verified doc ${id}`);
  const handleReject = (id: string) => alert(`Rejected doc ${id}`);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-pretty text-2xl font-semibold tracking-tight">
          Admin • Document Verification
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Review and action user-submitted identity documents.
        </p>
      </header>
      <section aria-label="Document Verification" className="p-4">
        {/* Filter Bar */}
        <div className="mb-4 flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search by name or doc number"
            value={filters.q}
            onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <select
            value={filters.type}
            onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Aadhar</option>
            <option>License</option>
          </select>
          <select
            value={filters.status}
            onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Verified</option>
            <option>Rejected</option>
          </select>
        </div>
        <DocumentTable documents={documents} />
      </section>
    </main>
  );
}
