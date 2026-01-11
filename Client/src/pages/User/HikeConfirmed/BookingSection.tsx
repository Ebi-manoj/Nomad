import type { RideBookingResponseDTO } from '@/store/features/user/rideBooking/rideBooking';
import { timeFormater } from '@/utils/dateFormater';
import { useEffect, useState } from 'react';
import {
  Clock,
  Navigation,
  MessageCircle,
  User,
  Calendar,
  Loader2,
  Bike,
  Car,
} from 'lucide-react';
import { getRideBookingOTP } from '@/api/rideBooking';
import { handleApiError } from '@/utils/HandleApiError';
import { UserAvatar } from '@/components/ProfilePic';

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
      handleApiError(error);
    } finally {
      setRideOtp(prev => {
        return { ...prev, loading: false };
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Rider Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100/50 p-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <UserAvatar
                subscriptionTier={rider.subscriptionTier}
                badgeColor={rider.badgeColor}
                fullName={rider.name}
                showBadge
                imageUrl={rider.profilePic}
                size="lg"
                className="relative border-2 border-white ring-2 ring-slate-50"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {rider.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-md">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs font-bold text-white">
                    {rider.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-3 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:scale-105 hover:bg-black transition-all duration-300 cursor-pointer group"
                onClick={onChatClick}
                aria-label="Chat"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-[-10deg] transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Card (Dynamic Icon) */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-700 group-hover:bg-slate-100 transition-colors">
              {['bike', 'scooter', 'motorcycle'].some(type =>
                rider.vehicleModel.toLowerCase().includes(type)
              ) ? (
                <Bike className="w-6 h-6" />
              ) : (
                <Car className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Vehicle
              </p>
              <p className="text-lg font-bold text-slate-900">
                {rider.vehicleModel}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-slate-900 rounded-lg shadow-sm">
            <span className="font-mono font-bold text-white tracking-widest">
              {rider.vehicleNumber}
            </span>
          </div>
        </div>

        {/* Timeline (Original Style Refined) */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100/50 p-6">
          <div className="space-y-6">
            {/* Pickup */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm ring-4 ring-emerald-50"></div>
                <div className="w-0.5 h-16 bg-slate-200 my-1"></div>
              </div>
              <div className="flex-1 pt-0 -mt-1.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                    PICKUP
                  </span>
                </div>
                <p className="font-bold text-slate-900 text-lg leading-snug">
                  {rideDetails.pickupAddress}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm font-medium text-slate-500">
                    Departure: {departure}
                  </p>
                  {rideOtp.otp && (
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      OTP: {rideOtp.otp}
                    </span>
                  )}
                  {!rideOtp.otp && (
                    <button
                      className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
                      onClick={handleViewOtp}
                      disabled={rideOtp.loading}
                    >
                      {rideOtp.loading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        'View OTP'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Dropoff */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-rose-500 rounded-full shadow-sm ring-4 ring-rose-50"></div>
              </div>
              <div className="flex-1 pt-0 -mt-1.5">
                <span className="text-xs font-bold text-rose-600 tracking-wider uppercase bg-rose-50 px-2 py-0.5 rounded-md mb-1 inline-block">
                  DROPOFF
                </span>
                <p className="font-bold text-slate-900 text-lg leading-snug">
                  {rideDetails.dropoffAddress}
                </p>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Est. {estimation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Stats */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100/50 p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Trip Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300 group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h4" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Duration
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 group-hover:text-indigo-900">
                {Math.round(rideDetails.duration)}
                <span className="text-sm font-medium text-slate-400 ml-1">
                  min
                </span>
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 hover:border-purple-100 hover:bg-purple-50/30 transition-all duration-300 group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Navigation className="w-4 h4" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Distance
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 group-hover:text-purple-900">
                {rideDetails.distance}
                <span className="text-sm font-medium text-slate-400 ml-1">
                  km
                </span>
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-300 group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                  <User className="w-4 h4" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Seats
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 group-hover:text-emerald-900">
                {rideBooking.seatsBooked}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 hover:border-orange-100 hover:bg-orange-50/30 transition-all duration-300 group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Calendar className="w-4 h4" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Amount
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 group-hover:text-orange-900">
                ₹{rideBooking.amount.toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
