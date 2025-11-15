import {
  MapPin,
  MapPinOff,
  Route,
  MessageCircle,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { useRideRoute } from '@/context/RiderHikesRoutesContext';
import {} from 'lucide-react';

interface CurrentHikerCardProps {
  hiker: GetHikersMatchedResponseDTO;
  onChatClick?: (hiker: GetHikersMatchedResponseDTO) => void;
}

export function CurrentHikerCard({
  hiker,
  onChatClick,
}: CurrentHikerCardProps) {
  const { selectedHikerId, hideRoute, showRoute } = useRideRoute();

  const handleToggleRoute = () => {
    const pickup = hiker.hikeDetails.pickupLocation;
    const dropoff = hiker.hikeDetails.dropoffLocation;
    const hikeId = hiker.hikeDetails.hikeId;
    if (selectedHikerId === hiker.hikeDetails.hikeId) {
      hideRoute();
    } else {
      showRoute({ pickup, dropoff }, hikeId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'picked_up':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'dropped_off':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <Card className="group border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 rounded-2xl bg-white overflow-hidden backdrop-blur-sm">
      <CardContent className="p-3.5">
        <div className="flex gap-3">
          {/* Profile Picture */}
          {/* Profile Picture */}
          <div className="relative w-14 h-14">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-gray-200 shadow-md">
              {hiker.user.profilePic ? (
                <img
                  src={hiker.user.profilePic}
                  alt={hiker.user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-gray-600">
                  {hiker.user.fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Verification Badge — FIXED */}
            {hiker.user.isVerified && (
              <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1 bg-blue-500 rounded-full p-1 ring-2 ring-white shadow-md">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {hiker.user.fullName}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700">
                      {hiker.user.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                    hiker.hikeDetails.status
                  )}`}
                >
                  {hiker.hikeDetails.status}
                </div>
              </div>
            </div>

            {/* Route Info */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-700 leading-relaxed">
                  {hiker.hikeDetails.pickupAddress}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPinOff className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-700 leading-relaxed">
                  {hiker.hikeDetails.destinationAdress}
                </span>
              </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-1.5 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-0.5">
                  <MdOutlineAirlineSeatReclineExtra className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-xs font-medium text-blue-700">
                  {hiker.hikeDetails.seatsRequested} seat
                  {hiker.hikeDetails.seatsRequested > 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-center p-1.5 bg-green-50 rounded-lg">
                <p className="text-xs font-semibold text-green-700">
                  ₹{hiker.hikeDetails.costShared}
                </p>
                <p className="text-xs text-green-600">Cost</p>
              </div>
              <div className="text-center p-1.5 bg-purple-50 rounded-lg">
                <p className="text-xs font-semibold text-purple-700">
                  {hiker.hikeDetails.totalDistance.toFixed(2)}km
                </p>
                <p className="text-xs text-purple-600">Distance</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleRoute}
                className="flex-1 h-7 text-xs bg-white hover:bg-gray-50 border-gray-300 cursor-pointer"
              >
                <Route className="w-3 h-3 mr-1" />
                {selectedHikerId !== hiker.hikeDetails.hikeId
                  ? 'Route'
                  : 'Hide Route'}
              </Button>

              {onChatClick && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onChatClick(hiker)}
                  className="cursor-pointer flex-1 h-7 text-xs bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Chat
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
