import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FaUserLarge } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
import { BsWallet2 } from 'react-icons/bs';
import { RiProfileLine } from 'react-icons/ri';
import { IoIosWarning } from 'react-icons/io';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logout } from '@/store/features/auth/auth.thunks';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export function ProfilePopover() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const path = location.pathname;

  async function handleLogout() {
    try {
      await dispatch(logout()).unwrap();
      window.location.href = '/auth/sign-in';
    } catch (error) {
      toast.success(typeof error == 'string' ? error : 'Logout Failed');
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`p-2 cursor-pointer group transition-colors ${
            path == '/profile' && 'border-b-2'
          }  border-black`}
        >
          <FaUserLarge className="transition-colors group-hover:text-gray-600" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-4 rounded-2xl shadow-lg bg-white border-0">
        <PopoverPrimitive.Arrow className="h-3 w-6 fill-white drop-shadow" />
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" alt="Cristiano" />
              <AvatarFallback>
                <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  {user?.fullName
                    ?.split(' ')
                    ?.map(w => w[0])
                    .join('')
                    .toUpperCase()}
                </div>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user?.fullName}</span>
            </div>
          </div>
        </div>
        <Separator className="my-3 bg-gray-200" />

        {/* Menu Options */}
        <div className="flex flex-col gap-3 text-sm">
          <button
            className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors"
            onClick={() => navigate('/profile')}
          >
            <span className="flex items-center gap-2">
              <RiProfileLine size={18} />
              Profile management
            </span>
          </button>

          <button className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors">
            <span className="flex items-center gap-2">
              <BsWallet2 size={18} />
              Wallet management
            </span>
          </button>

          <button className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors">
            <span className="flex items-center gap-2">
              <IoIosWarning size={18} />
              SOS
            </span>
          </button>

          <button
            className="cursor-pointer flex justify-between items-center hover:bg-gray-100
           rounded-md px-2 py-2 text-red-600 transition-colors"
            onClick={handleLogout}
          >
            <span className="flex items-center gap-2">
              <MdLogout size={18} />
              Logout
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
