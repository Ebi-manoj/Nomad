import {
  Calendar,
  Car,
  CheckCircle2,
  Eye,
  IndianRupee,
  MapPin,
  MoveRight,
  Phone,
  ShieldCheck,
  FileCheck,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/dateFormater';
import type { AdminRideResponseDTO } from '@/types/adminRide';
import { FaMotorcycle } from 'react-icons/fa6';

interface RideCardProps {
  ride: AdminRideResponseDTO;
  onView: (id: string) => void;
}

const getStatusColor = (s: string) => {
  switch (s) {
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const RideCard = ({ ride, onView }: RideCardProps) => {
  const initials = ride.user.fullName.substring(0, 2).toUpperCase();

  return (
    <div className="group bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-200">
      <div className="p-4">
        {/* --- USER & VERIFICATION HEADER --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 flex items-center justify-center border border-indigo-100 dark:border-indigo-800 text-sm font-bold overflow-hidden">
              {ride.user.profilePic ? (
                <img
                  src={ride.user.profilePic}
                  alt={ride.user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {ride.user.fullName}
                </span>

                {/* Verification Badges */}
                <div className="flex gap-1">
                  {ride.user.aadhaarVerified && (
                    <div className="group/tooltip relative">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                  )}
                  {ride.user.licenceVerified && (
                    <FileCheck className="w-3.5 h-3.5 text-purple-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {ride.user.mobile}
                </span>
                <span>•</span>
                <span>{ride.user.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500" />
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-none">
                  {ride.user.rating || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Vehicle Chip */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-800">
            {ride.vehicleType === 'bike' ? (
              <FaMotorcycle className="w-4 h-4 text-gray-800" />
            ) : (
              <Car className="w-4 h-4 text-gray-800" />
            )}
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase leading-none">
                Vehicle
              </span>
              <span className="text-xs font-semibold text-foreground leading-none mt-0.5">
                {ride.vehicleModel}{' '}
                <span className="font-mono text-xs opacity-70">
                  ({ride.vehicleNumber})
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* --- RIDE DETAILS --- */}

        {/* Status & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(ride.status)}`}>
              {ride.status.toUpperCase()}
            </Badge>
            <span className="flex items-center text-muted-foreground text-xs gap-1 ml-1">
              <Calendar className="w-3 h-3" />
              {formatDate(ride.createdAt)}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="cursor-pointer h-7 px-3 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 hover:text-white"
            onClick={() => onView(ride.id)}
          >
            <Eye className="w-3 h-3 " />
            Details
          </Button>
        </div>

        {/* Route Visualization */}
        <div className="flex items-center gap-3 mb-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100 ring-4 ring-gray-200 dark:ring-gray-800 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                Pickup
              </p>
              <p
                className="text-sm font-medium text-foreground truncate"
                title={ride.pickupAddress}
              >
                {ride.pickupAddress}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 px-1 text-black">
            <MoveRight className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-0 text-right justify-end">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                Drop
              </p>
              <p
                className="text-sm font-medium text-foreground truncate"
                title={ride.destinationAddress}
              >
                {ride.destinationAddress}
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-100 flex-shrink-0" />
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/20 p-2 rounded-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" title="Total Distance">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-semibold text-foreground">
                {ride.totalDistance}
              </span>{' '}
              km
            </div>
            <div className="w-px h-3 bg-border"></div>
            <div className="flex items-center gap-1.5" title="Cost Sharing">
              <IndianRupee className="w-3.5 h-3.5" />
              <span className="font-semibold text-foreground">
                {ride.costSharing}
              </span>{' '}
              /km
            </div>
            <div className="w-px h-3 bg-border"></div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">
                {ride.seatsAvailable}
              </span>{' '}
              Seat(s)
            </div>
            <div className="w-px h-3 bg-border"></div>
            <div className="flex items-center gap-1.5">
              {ride.hasHelmet ? (
                <span className="text-green-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Helmet
                </span>
              ) : (
                <span className="text-red-500 font-medium">No Helmet</span>
              )}
            </div>
          </div>

          <span className="font-mono text-[10px] opacity-60 hidden sm:inline-block">
            ID: {ride.id.slice(-8)}
          </span>
        </div>
      </div>
    </div>
  );
};
