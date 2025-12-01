import {
  User,
  ShieldCheck,
  Star,
  Mail,
  Smartphone,
  Bike,
  Car,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface UserProfileCardProps {
  title: string;
  user: any;
  isRider?: boolean;
  vehicle?: any;
}

export const UserProfileCard = ({
  title,
  user,
  isRider = false,
  vehicle,
}: UserProfileCardProps) => {
  if (!user)
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px] border-dashed">
        <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-3">
          <User className="w-6 h-6 text-zinc-300" />
        </div>
        <p className="text-sm text-zinc-400">
          No {title.toLowerCase()} assigned yet
        </p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 h-full flex flex-col">
      <SectionHeader icon={isRider ? Bike : User} title={title} />

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-700 dark:text-zinc-300">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                {user.fullName}
              </h4>
              {user.aadhaarVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {/* Rating Component */}
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-500 leading-none">
                  {user.rating > 0 ? user.rating.toFixed(1) : 'N/A'}
                </span>
              </div>
              <span className="text-xs text-zinc-400">
                {isRider ? 'Driver' : 'Passenger'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-0.5 mt-auto">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 py-1.5">
          <Mail className="w-3.5 h-3.5" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 py-1.5">
          <Smartphone className="w-3.5 h-3.5" />
          <span>{user.mobile}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 py-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ID Verified: {user.aadhaarVerified ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {isRider && vehicle && (
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Vehicle Details
          </p>
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              {vehicle.type === 'bike' ? (
                <Bike className="w-4 h-4 text-zinc-500" />
              ) : (
                <Car className="w-4 h-4 text-zinc-500" />
              )}
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                {vehicle.model}
              </span>
            </div>
            <span className="text-xs font-mono bg-white dark:bg-black px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-500">
              {vehicle.number}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
