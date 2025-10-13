import { DocumentTable } from '@/components/documentFields';
import { useState } from 'react';

export default function DocumentVerification() {
  const [filters, setFilters] = useState({
    q: '',
    type: 'All',
    status: 'All',
  });

  // 🧩 Dummy document data for testing UI
  const dummyDocs = [
    {
      id: '1',
      user: {
        name: 'Ebi Manoj',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      type: 'Aadhar',
      status: 'Pending',
      docNumber: '1234-5678-9012',
      uploadedAt: new Date().toISOString(),
    },
  ];

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
        <DocumentTable documents={dummyDocs} />
      </section>
    </main>
  );
}
