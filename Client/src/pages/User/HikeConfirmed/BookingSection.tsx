import type { RideBookingResponseDTO } from '@/store/features/user/rideBooking/rideBooking';
import { timeFormater } from '@/utils/dateFormater';
import { useEffect, useState } from 'react';
import {
  Clock,
  Navigation,
  MessageCircle,
  User,
  Car,
  Calendar,
  Loader2,
} from 'lucide-react';
import { getRideBookingOTP } from '@/api/rideBooking';
import { useHandleApiError } from '@/hooks/useHandleApiError';

export type RideOTPState = {
  otp: string | null;
  loading: boolean;
};

export const BookingSection = ({
  booking,
  onChatClick,
}: {
  booking: RideBookingResponseDTO;
  onChatClick: () => void;
}) => {
  const { rideBooking, rider, rideDetails } = booking;
  const [departure, setDeparture] = useState('');
  const [estimation, setEstimation] = useState('');
  const [rideOtp, setRideOtp] = useState<RideOTPState>({
    otp: null,
    loading: false,
  });

  useEffect(() => {
    if (!booking) return;
    setDeparture(timeFormater(rideDetails.departure));
    setEstimation(timeFormater(rideDetails.duration + rideDetails.departure));
  }, [booking]);

  const handleViewOtp = async () => {
    setRideOtp({ ...rideOtp, loading: true });
    try {
      const data = await getRideBookingOTP(rideBooking.bookingId);
      setRideOtp({ ...rideOtp, otp: data.otp });
    } catch (error) {
      useHandleApiError(error);
    } finally {
      setRideOtp(prev => {
        return { ...prev, loading: false };
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Rider Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Ride Details
        </h2>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {rider.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{rider.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {rider.rating}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition">
              <MessageCircle className="w-5 h-5" onClick={onChatClick} />
            </button>
          </div>
        </div>

        {/* Vehicle */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
          <Car className="w-6 h-6 text-gray-600" />
          <div>
            <p className="font-semibold">{rider.vehicleModel}</p>
            <p className="text-sm text-gray-600">{rider.vehicleNumber}</p>
          </div>
        </div>

        {/* Pickup & Drop */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-0.5 h-16 bg-gray-300"></div>
            </div>
            <div className="flex-1 pt-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-600">
                  PICKUP
                </span>
              </div>
              <p className="font-semibold text-gray-900">
                {rideDetails.pickupAddress}
              </p>
              <p className="text-sm text-gray-500">Departure: {departure}</p>
              {rideOtp.otp && (
                <p className="text-sm font-semibold text-blue-600">
                  OTP: {rideOtp.otp}
                </p>
              )}
              {!rideOtp.otp && (
                <p
                  className="text-sm font-semibold text-blue-600 cursor-pointer underline"
                  onClick={handleViewOtp}
                >
                  {rideOtp.loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'View OTP'
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex-1 pt-0">
              <span className="text-sm font-medium text-red-600 block mb-1">
                DROPOFF
              </span>
              <p className="font-semibold text-gray-900">
                {rideDetails.dropoffAddress}
              </p>
              <p className="text-sm text-gray-500">Est. {estimation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Trip Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Duration</p>
              <p className="font-semibold">
                {Math.round(rideDetails.duration)} mins
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Navigation className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-600">Distance</p>
              <p className="font-semibold">{rideDetails.distance} km</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Seats</p>
              <p className="font-semibold">{rideBooking.seatsBooked}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <Calendar className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-600">Amount</p>
              <p className="font-semibold">₹{rideBooking.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
