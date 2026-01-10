import { Check, X, MapPin, MapPinOff, Route, Clock, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { RideRequestDTO } from '@/types/ride';
import { MdOutlineAirlineSeatReclineExtra, MdVerified } from 'react-icons/md';
import { useRideRoute } from '@/context/RiderHikesRoutesContext';
import { UserAvatar } from '@/components/ProfilePic';

interface HikerCardProps {
  request: RideRequestDTO;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
  processingId?: string;
  processingAction?: 'accept' | 'decline';
}

export function HikerCard({ request, onAccept, onDecline, processingId, processingAction }: HikerCardProps) {
  const { selectedHikerId, showRoute, hideRoute } = useRideRoute();
  const handleToggleRoute = () => {
    const route = {
      pickup: {
        lat: request.pickupLocation.coordinates[1],
        lng: request.pickupLocation.coordinates[0],
      },
      dropoff: {
        lat: request.dropoffLocation.coordinates[1],
        lng: request.dropoffLocation.coordinates[0],
      },
    };

    if (selectedHikerId === request.id) {
      hideRoute();
    } else {
      showRoute(route, request.id);
    }
  };
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
          <div className="shrink-0">
            <UserAvatar
              subscriptionTier={request.hiker.subscriptionTier}
              fullName={request.hiker.fullName}
              badgeColor={request.hiker.badgeColor}
              showBadge
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1 items-center">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                  {hiker.fullName}
                </h4>
                {hiker.isVerified && (
                  <span>
                    <MdVerified className="text-blue-400" />
                  </span>
                )}
              </div>
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
            <div className="grid grid-cols-3 gap-1 text-xs text-gray-900 dark:text-gray-300 mb-3 px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-center gap-1 p-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{costSharing}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 border-x border-gray-200 dark:border-gray-700 p-1">
                <MdOutlineAirlineSeatReclineExtra />
                <span>
                  {seatsRequested} <span className="hidden sm:inline">seat{seatsRequested > 1 ? 's' : ''}</span>
                </span>
              </div>
              {totalDistance && (
                <div className="flex items-center justify-center gap-1 p-1">
                  <Route size={12} className="" />
                  <span>{totalDistance.toFixed(1)} <span className="hidden sm:inline">km</span></span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 items-center transition-all duration-200">
              {/* View Route visible for both Pending and Accepted */}
              {(request.status === 'pending' ||
                request.status === 'accepted') && (
                <Button
                  onClick={handleToggleRoute}
                  variant="outline"
                  size="sm"
                  className="h-7 text-[11px] cursor-pointer border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 px-2.5 flex-1 min-w-[80px] text-gray-700 dark:text-gray-300 transition-all duration-200"
                >
                  <MapPin
                    size={12}
                    className="mr-1 text-gray-600 dark:text-gray-400"
                  />
                  {selectedHikerId === request.id ? 'Hide ' : 'View '}
                </Button>
              )}

              {/* Pending — show Accept & Decline */}
              {request.status === 'pending' && (
                <>
                  <Button
                    onClick={() => onAccept(request.id)}
                    size="sm"
                    disabled={processingId === request.id}
                    className="h-7 px-2.5 bg-gradient-to-r flex-1 min-w-[80px] cursor-pointer from-gray-900 to-black dark:from-gray-100 dark:to-white hover:from-black hover:to-gray-900 dark:hover:from-white dark:hover:to-gray-100 text-white dark:text-black text-[11px] shadow-sm hover:shadow transition-all duration-200 disabled:opacity-60"
                  >
                    {processingId === request.id && processingAction === 'accept' ? (
                      <>
                        <Loader2 size={13} className="mr-1 animate-spin" />
                        Accepting...
                      </>
                    ) : (
                      <>
                        <Check size={13} className="mr-1" />
                        Accept
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => onDecline(request.id)}
                    variant="outline"
                    size="sm"
                    disabled={processingId === request.id}
                    className="h-7 px-2.5 border-red-200 flex-1 min-w-[80px] cursor-pointer dark:border-red-900 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-300 dark:hover:border-red-800 text-[11px] transition-all duration-200 disabled:opacity-60"
                  >
                    {processingId === request.id && processingAction === 'decline' ? (
                      <>
                        <Loader2 size={13} className="mr-1 animate-spin" />
                        Declining...
                      </>
                    ) : (
                      <>
                        <X size={13} className="mr-1" />
                        Decline
                      </>
                    )}
                  </Button>
                </>
              )}

              {/* Accepted — show waiting label */}
              {request.status === 'accepted' && (
                <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-md text-yellow-700 dark:text-yellow-300 text-[11px]">
                  <Clock size={13} className="animate-pulse" />
                  Waiting for hiker payment...
                </div>
              )}

              {/* Declined — show declined label */}
              {request.status === 'declined' && (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-md text-red-700 dark:text-red-400 text-[11px]">
                  <X size={13} />
                  Request Declined
                </div>
              )}
            </div>
            {request.status === 'expired' && (
              <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-md text-yellow-700 dark:text-yellow-400 text-[11px]">
                <Clock size={13} />
                Request Expired
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
