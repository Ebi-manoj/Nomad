import { SubmitBtn } from './SubmitBtn';
import { StatusBadge } from './StatusBadge';

export function DocumentTable({ documents }: { documents: any }) {
  return (
    <div className="rounded-lg border border-border bg-card/40 overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Document</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Details</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc: any) => (
            <tr key={doc.id}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.user.avatar}
                    alt={doc.user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">{doc.user.name}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{doc.type}</td>
              <td className="px-4 py-3">
                <StatusBadge status="Pending" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {doc.user.avatar ? (
                    <img
                      src={doc.user.avatar || '/placeholder.svg'}
                      alt="Document preview"
                      className="h-12 w-18 rounded-md border border-border object-cover"
                    />
                  ) : (
                    <a
                      href="#"
                      className="text-primary text-sm underline underline-offset-2"
                    >
                      View
                    </a>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm">{doc.docNumber}</p>
                    <p className="text-muted-foreground text-xs">
                      Uploaded {doc.uploadedAt}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <SubmitBtn
                    text="verify"
                    isLoading={false}
                    className="w-auto px-4 py-1.5 text-sm"
                  />
                  <SubmitBtn
                    text="reject"
                    isLoading={false}
                    className="w-auto px-4 py-1.5 text-sm bg-red-500 hover:bg-red-400"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
