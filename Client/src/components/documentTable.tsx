import { SubmitBtn } from './SubmitBtn';
import { StatusBadge } from './StatusBadge';
import { Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { AdminDocument } from '@/store/features/admin/documents/adminDoc';
import { formatDate } from '@/utils/dateFormater';

type docTableProps = {
  documents: AdminDocument[];
  handleImageModal: (url: string) => void;
};

export function DocumentTable({ documents, handleImageModal }: docTableProps) {
  return (
    <div className="rounded-lg border border-border bg-white shadow-sm overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500 bg-gray-50">
            <th className="px-5 py-3 font-medium">User</th>
            <th className="px-5 py-3 font-medium">Document</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Details</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc: AdminDocument) => (
            <tr
              key={doc.id}
              className="border-b last:border-none hover:bg-gray-50 transition-colors"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={''}
                      alt={doc.user.fullName}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-sm font-medium">
                      {doc.user.fullName
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800">
                      {doc.user.fullName}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 capitalize">{doc.type}</td>

              <td className="px-5 py-4">
                <StatusBadge status={doc.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <button
                    title="View Document"
                    className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Eye
                      size={18}
                      className="text-gray-600"
                      onClick={() => handleImageModal(doc.fileURL)}
                    />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {doc.doc_number}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uploaded {formatDate(doc.createdAt)}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <SubmitBtn
                    text="Verify"
                    isLoading={false}
                    className="w-auto px-4 py-1.5 text-sm"
                  />
                  <SubmitBtn
                    text="Reject"
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
