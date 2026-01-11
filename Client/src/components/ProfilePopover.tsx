import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { LuNotebookText } from 'react-icons/lu';
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
import { Crown, TrendingUp, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ProfilePopover() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const path = location.pathname;
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await dispatch(logout()).unwrap();
      navigate('/auth/sign-in', { replace: true });
    } catch (error) {
      toast.error(typeof error == 'string' ? error : 'Logout Failed');
      setLoggingOut(false);
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
              <AvatarImage src={user?.profilePic} alt="Cristiano" />
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
          <PopoverPrimitive.Close asChild>
            <button
              disabled={loggingOut}
              className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate('/profile')}
            >
              <span className="flex items-center gap-2">
                <RiProfileLine size={18} />
                Profile management
              </span>
            </button>
          </PopoverPrimitive.Close>

          <PopoverPrimitive.Close asChild>
            <button
              disabled={loggingOut}
              className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate('/wallet')}
            >
              <span className="flex items-center gap-2">
                <BsWallet2 size={18} />
                Wallet management
              </span>
            </button>
          </PopoverPrimitive.Close>

          <PopoverPrimitive.Close asChild>
            <button
              disabled={loggingOut}
              className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate('/sos')}
            >
              <span className="flex items-center gap-2">
                <IoIosWarning size={18} />
                SOS
              </span>
            </button>
          </PopoverPrimitive.Close>

          <PopoverPrimitive.Close asChild>
            <button
              disabled={loggingOut}
              className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate('/subscriptions')}
            >
              <span className="flex items-center gap-2">
                <Crown className="text-amber-500" size={18} />
                Subscription
              </span>
            </button>
          </PopoverPrimitive.Close>

          {user?.role === 'user' && (
            <PopoverPrimitive.Close asChild>
              <button
                disabled={loggingOut}
                className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigate('/insights')}
              >
                <span className="flex items-center gap-2">
                  <TrendingUp size={18} />
                  Insights
                </span>
              </button>
            </PopoverPrimitive.Close>
          )}

          <PopoverPrimitive.Close asChild>
            <button
              disabled={loggingOut}
              className="block md:hidden cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate('/activity')}
            >
              <span className="flex items-center gap-2">
                <LuNotebookText size={18} />
                Activity
              </span>
            </button>
          </PopoverPrimitive.Close>

          <button
            disabled={loggingOut}
            className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md px-2 py-2 text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogout}
          >
            <span className="flex items-center gap-2">
              {loggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MdLogout size={18} />
              )}
              {loggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
