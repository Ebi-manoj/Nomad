import { Check, X, MapPin, MapPinOff, Route } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { RideRequestDTO } from '@/types/ride';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';

interface HikerCardProps {
  request: RideRequestDTO;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
  onViewRoute: (request: any) => void;
}

export function HikerCard({
  request,
  onAccept,
  onDecline,
  onViewRoute,
}: HikerCardProps) {
  const {
    hiker,
    hikerPickupAddress,
    hikerDestinationAddress,
    seatsRequested,
    costSharing,
    totalDistance,
  } = request;

  return (
    <Card className="group border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 rounded-2xl bg-white dark:bg-gray-950 overflow-hidden backdrop-blur-sm">
      <CardContent className="p-3.5">
        <div className="flex gap-3">
          {/* Profile Picture */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800 ring-offset-2 ring-offset-white dark:ring-offset-gray-950">
            {hiker.profilePicture ? (
              <img
                src={hiker.profilePicture}
                alt={hiker.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 dark:text-gray-600 text-lg">
                👤
              </span>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                {hiker.fullName}
              </h4>
              {hiker.rating && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 text-yellow-700 dark:text-yellow-400 flex items-center gap-0.5 border border-yellow-200 dark:border-yellow-900">
                  ⭐ {hiker.rating.toFixed(1)}
                </span>
              )}
            </div>

            {/* Pickup & Destination */}
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
              <div className="flex items-start gap-1.5 group/pickup">
                <div className="w-3.5 h-3.5 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mt-[1px]">
                  <MapPin className="text-green-600 dark:text-green-500 w-2.5 h-2.5" />
                </div>
                <span className="truncate">
                  {hikerPickupAddress.split(',')[0]}
                </span>
              </div>
              <div className="flex items-start gap-1.5 group/dest">
                <div className="w-3.5 h-3.5 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mt-[1px]">
                  <MapPinOff className="text-red-600 dark:text-red-500 w-2.5 h-2.5" />
                </div>
                <span className="truncate">
                  {hikerDestinationAddress.split(',')[0]}
                </span>
              </div>
            </div>

            {/* Cost, Seats & Distance */}
            <div className="flex items-center justify-between text-xs text-gray-900 dark:text-gray-300 mb-3 px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{costSharing}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineAirlineSeatReclineExtra />
                <span>
                  {seatsRequested} seat{seatsRequested > 1 ? 's' : ''}
                </span>
              </div>
              {totalDistance && (
                <div className="flex items-center gap-1 ">
                  <Route size={12} className="" />
                  <span>{totalDistance.toFixed(2)} km</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-1.5">
              <Button
                onClick={() => onViewRoute(request)}
                variant="outline"
                size="sm"
                className="h-7 text-[11px] border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 px-2.5 min-w-0 text-gray-700 dark:text-gray-300 transition-all duration-200"
              >
                <MapPin
                  size={12}
                  className="mr-1 text-gray-600 dark:text-gray-400"
                />
                Route
              </Button>
              <Button
                onClick={() => onAccept(request.id)}
                size="sm"
                className="h-7 px-2.5 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white hover:from-black hover:to-gray-900 dark:hover:from-white dark:hover:to-gray-100 text-white dark:text-black text-[11px] min-w-0 shadow-sm hover:shadow transition-all duration-200"
              >
                <Check size={13} className="mr-1" />
                Accept
              </Button>
              <Button
                onClick={() => onDecline(request.id)}
                variant="outline"
                size="sm"
                className="h-7 px-2.5 border-red-200 dark:border-red-900 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-300 dark:hover:border-red-800 text-[11px] min-w-0 transition-all duration-200"
              >
                <X size={13} className="mr-1" />
                Decline
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
