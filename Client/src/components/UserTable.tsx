import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleButton } from './ToogleButton';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleBlock } from '@/store/features/admin/users/usersSlice.thunk';
import { toast } from 'sonner';
import { TableSkeleton } from './skeletons/TableSkeleton';
import { useState } from 'react';
import { GenericModal } from './GenericModel';
import { CircleAlert, ShieldAlert } from 'lucide-react';

interface SelectedUser {
  id: string;
  fullName: string;
  isBlocked: boolean;
}

export function UserTable() {
  const { users, loading } = useSelector((state: RootState) => state.users);

  const dispatch = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  const openConfirm = (user: SelectedUser) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!selectedUser) return;
    try {
      setConfirmLoading(true);
      const blockedState = selectedUser.isBlocked ? 'unblocked' : 'blocked';
      await dispatch(toggleBlock(selectedUser.id)).unwrap();
      toast.success(`User ${blockedState} succesfully`);
      setConfirmOpen(false);
      setSelectedUser(null);
    } catch (error) {
      typeof error == 'string' && toast.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full">
          <thead className="border-b border-border bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                Mobile
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                Block
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border ">
            {loading && <TableSkeleton />}
            {!loading &&
              users.map(user => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={''} alt={user.fullName} />
                        <AvatarFallback>
                          {user.fullName
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {user.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {user.mobile || 'nill'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <ToggleButton
                      state={user.isBlocked}
                      clickHandler={() =>
                        openConfirm({
                          id: user.id,
                          fullName: user.fullName,
                          isBlocked: user.isBlocked,
                        })
                      }
                    ></ToggleButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <GenericModal
        isOpen={confirmOpen}
        onClose={() => {
          if (confirmLoading) return;
          setConfirmOpen(false);
          setSelectedUser(null);
        }}
        title={selectedUser?.isBlocked ? 'Unblock user' : 'Block user'}
        titleIcon={ <ShieldAlert size={20}/>}
        subtitle={
          selectedUser
            ? selectedUser.isBlocked
              ? `Allow ${selectedUser.fullName} to access the platform again.`
              : `Are you sure you want to block ${selectedUser.fullName}? They won't be able to log in.`
            : undefined
        }
        primaryAction={{
          label: selectedUser?.isBlocked ? 'Yes, unblock' : 'Yes, block',
          className: selectedUser?.isBlocked
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-red-600 hover:bg-red-700',
          onClick: handleConfirmToggle,
          loading: confirmLoading,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => {
            if (confirmLoading) return;
            setConfirmOpen(false);
            setSelectedUser(null);
          },
        }}
      >
        <div className='flex items-center gap-1 py-1'>
          <CircleAlert size={12} className='text-orange-600'/>
          <p className="text-sm text-gray-600 ">
          {selectedUser?.isBlocked
            ? 'This will allow the user to log in and use the app again.'
            : 'You can unblock this user later from this page if needed.'}
        </p>
        </div>
      </GenericModal>
    </div>
  );
}
