import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleButton } from './ToogleButton';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleBlock } from '@/store/features/admin/users/usersSlice.thunk';
import { toast } from 'sonner';

export function UserTable() {
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  async function handleToggler(id: string) {
    try {
      await dispatch(toggleBlock(id)).unwrap();
    } catch (error) {
      typeof error == 'string' && toast.error(error);
    }
  }

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
          <tbody className="divide-y divide-border">
            {users.map(user => (
              <tr key={user.id} className="transition-colors hover:bg-gray-50">
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
                    clickHandler={() => handleToggler(user.id)}
                  ></ToggleButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
