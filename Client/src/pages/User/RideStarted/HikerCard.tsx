import { Check, X, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HikerCardProps {
  request: any;
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
    pickupLocation,
    dropoffLocation,
    seatsRequested,
    estimatedCost,
  } = request;

  const formatLocation = (point: any) => {
    return `${point.coordinates[1].toFixed(4)}, ${point.coordinates[0].toFixed(
      4
    )}`;
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl bg-white">
      <CardContent className="p-3">
        <div className="flex gap-2.5">
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {hiker.profilePicture ? (
              <img
                src={hiker.profilePicture}
                alt={hiker.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">👤</span>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 overflow-hidden">
            {/* Name and Rating */}
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <h4 className="font-semibold text-sm text-gray-900 truncate">
                {hiker.fullName}
              </h4>
              {hiker.rating && (
                <span className="text-xs font-medium text-amber-600 flex items-center gap-0.5 flex-shrink-0">
                  ⭐ {hiker.rating.toFixed(1)}
                </span>
              )}
            </div>

            {/* Location Info */}
            <div className="space-y-0.5 text-xs text-gray-600 mb-2">
              <div className="flex items-start gap-1">
                <span className="text-green-600 flex-shrink-0 text-[10px]">
                  📍
                </span>
                <span className="truncate leading-tight">
                  {formatLocation(pickupLocation)}
                </span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-red-600 flex-shrink-0 text-[10px]">
                  📍
                </span>
                <span className="truncate leading-tight">
                  {formatLocation(dropoffLocation)}
                </span>
              </div>
            </div>

            {/* Cost and Seats */}
            <div className="flex items-center gap-2 text-xs mb-2.5">
              <span className="font-semibold text-gray-900">
                ₹{estimatedCost}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {seatsRequested} seat{seatsRequested > 1 ? 's' : ''}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 w-full">
              <Button
                onClick={() => onViewRoute(request)}
                variant="outline"
                size="sm"
                className="h-7 text-[11px] border-gray-300 hover:bg-gray-50 px-2 min-w-0"
              >
                <MapPin size={12} className="mr-0.5" />
                Route
              </Button>
              <Button
                onClick={() => onAccept(request.id)}
                size="sm"
                className="h-7 px-2.5 bg-green-600 hover:bg-green-700 text-white text-[11px] min-w-0"
              >
                <Check size={13} className="mr-0.5" />
                Accept
              </Button>
              <Button
                onClick={() => onDecline(request.id)}
                variant="outline"
                size="sm"
                className="h-7 px-2.5 border-red-300 text-red-600 hover:bg-red-50 text-[11px] min-w-0"
              >
                <X size={13} className="mr-0.5" />
                Decline
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
