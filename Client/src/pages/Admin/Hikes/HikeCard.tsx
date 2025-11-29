import { BadgeCheck, Calendar, Eye, MoveRight, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/dateFormater';
import type { AdminHikeResponseDTO } from '@/types/adminHike';

interface HikeCardProps {
  hike: AdminHikeResponseDTO;
  onView: (id: string) => void;
}

const getStatusColor = (s: string) => {
  switch (s) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const HikeCard = ({ hike, onView }: HikeCardProps) => {
  return (
    <div className="group bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-200">
      <div className="p-4">
        {/* --- NEW: USER DETAILS HEADER --- */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              {hike.user?.profilePic ? (
                <img
                  src={hike.user.profilePic}
                  alt={hike.user.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}

              {hike.status === 'active' && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {hike.user?.fullName || 'Unknown User'}
                </span>
                {(hike.user?.isVerified ||
                  hike.user?.aadhaarVerified ||
                  hike.user?.licenceVerified) && (
                  <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                )}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {hike.user?.email}
              </span>
            </div>
          </div>

          {/* Rating Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full border border-amber-100 dark:border-amber-800/50">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-500">
              {hike.user?.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>

        {/* --- HIKE DETAILS SECTION --- */}

        {/* Top Row: Status & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(hike.status)}`}>
              {hike.status.toUpperCase()}
            </Badge>
            <span className="flex items-center text-muted-foreground text-xs gap-1 ml-1">
              <Calendar className="w-3 h-3" />
              {formatDate(hike.createdAt)}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="cursor-pointer h-7 px-3 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10"
            onClick={() => onView(hike.id)}
          >
            <Eye className="w-3 h-3 mr-1.5" />
            Details
          </Button>
        </div>

        {/* Route Visualizer */}
        <div className="flex items-center gap-3 mb-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
          {/* Pickup */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100 ring-4 ring-gray-200 dark:ring-gray-800 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                From
              </p>
              <p
                className="text-sm font-medium text-foreground truncate"
                title={hike.pickupAddress}
              >
                {hike.pickupAddress}
              </p>
            </div>
          </div>

          {/* Arrow Connector */}
          <div className="flex-shrink-0 px-1 text-black ">
            <MoveRight className="w-4 h-4" />
          </div>

          {/* Destination */}
          <div className="flex items-center gap-2 flex-1 min-w-0 text-right justify-end">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                To
              </p>
              <p
                className="text-sm font-medium text-foreground truncate"
                title={hike.destinationAddress}
              >
                {hike.destinationAddress}
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-red-400 ring-4 ring-red-100 flex-shrink-0" />
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {hike.totalDistance}
              </span>{' '}
              km
            </div>
            <div className="w-px h-3 bg-border"></div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {hike.seatsRequested}
              </span>{' '}
              Seat(s)
            </div>
            <div className="w-px h-3 bg-border"></div>
            <div className="flex items-center gap-1">
              Helmet:{' '}
              <span
                className={
                  hike.hasHelmet
                    ? 'text-green-600 font-medium'
                    : 'text-red-500 font-medium'
                }
              >
                {hike.hasHelmet ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
