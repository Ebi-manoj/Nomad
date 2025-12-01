import { getRideDetails } from '@/api/ride';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { clearRideData } from '@/store/features/user/ride/rideSlice';
import type { GetRideDetailsResDTO } from '@/types/ride';
import { formatDate, formatDuration } from '@/utils/dateFormater';
import {
  MapPin,
  Navigation,
  Car,
  Clock,
  Star,
  Check,
  Sparkles,
  ArrowLeft,
  Users,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

export const RideCompletedPage = () => {
  const navigate = useNavigate();
  const [rideData, setRideData] = useState<GetRideDetailsResDTO | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const handleRedirect = () => {
    navigate('/ride', { replace: true });
    dispatch(clearRideData());
  };

  const { rideId } = useParams();

  useEffect(() => {
    if (!rideId) return;
    const fetch = async () => {
      try {
        const data = await getRideDetails(rideId);
        setRideData(data);
      } catch (error) {
        useHandleApiError(error);
      }
    };
    fetch();
  }, []);

  if (!rideData) return <div>No Ride Found</div>;
  const grossCollected = rideData.totalCostShared + rideData.platformFee;
  const netEarnings = rideData.totalCostShared;
  const platformFee = rideData.platformFee;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card p-8 pb-4 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          {/* Success Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Ride <span className="text-blue-600">delivered</span>
              <span className="ml-2">🚗</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Excellent work! You've earned{' '}
              <span className="font-bold text-green-600">
                ₹{rideData.totalCostShared}
              </span>
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Thanks for being a reliable Nomad driver
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="flex gap-6 max-w-7xl mx-auto">
            {/* Ride Summary - Left Side */}
            <div className="bg-card rounded-2xl p-6 border shadow-sm w-full">
              {/* Earnings Highlight Banner */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium mb-1">
                      Total Earnings
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      ₹{rideData.totalCostShared}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-700 font-medium mb-1">
                      Passengers
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {rideData.hikersMatched.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-700 font-medium mb-1">
                      Avg per passenger
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      ₹
                      {Math.round(
                        rideData.totalCostShared / rideData.hikersMatched.length
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Trip Details
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    ID: {rideData.rideId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {/* Pickup */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Start Location
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {rideData.startAddress.split(',')[0]}
                    </p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
                  <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      End Location
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {rideData.endAddress.split(',')[0]}
                    </p>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Distance Covered
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {rideData.totalDistance.toFixed(2)} km
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
                  <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Trip Duration
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {formatDuration(
                        rideData.createdAt,
                        rideData.completedAt!
                      )}
                    </p>
                  </div>
                </div>

                {/* Vehicle */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
                  <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Your Vehicle
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {rideData.vehicleModel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {rideData.vehicleNumber}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
                  <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Your Rating</p>
                    <p className="font-semibold text-base text-foreground">
                      {4.8} / 5.0
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Financial Breakdown
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-inner">
                  {/* 1. Total Collected */}
                  <div className="flex flex-col items-center">
                    <FaRupeeSign className="w-6 h-6 text-blue-600 mb-1" />
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Total Collected
                    </p>
                    <p className="text-2xl font-extrabold text-blue-700">
                      ₹{grossCollected}
                    </p>
                    <p className="text-xs text-gray-400">(Before fee)</p>
                  </div>

                  {/* 2. Platform Fee */}
                  <div className="flex flex-col items-center border-l border-r border-gray-200">
                    <div className="w-6 h-6 mb-1 text-red-600 font-bold flex items-center justify-center">
                      %
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Platform Fee
                    </p>
                    <p className="text-2xl font-extrabold text-red-600">
                      ₹{platformFee}
                    </p>
                    <p className="text-xs text-gray-400">
                      ({((platformFee / grossCollected) * 100).toFixed(1)}%)
                    </p>
                  </div>

                  {/* 3. Driver Earnings (Net) */}
                  <div className="flex flex-col items-center">
                    <Wallet className="w-6 h-6 text-green-600 mb-1" />
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Your Net Earnings
                    </p>
                    <p className="text-2xl font-extrabold text-green-600">
                      ₹{netEarnings}
                    </p>
                    <p className="text-xs text-gray-400">(Your take-home)</p>
                  </div>
                </div>
              </div>

              {/* Passengers Section */}
              <div className="border-t pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        Your Passengers
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {rideData.hikersMatched.length} people rode with you
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Total collected
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{grossCollected}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {rideData.hikersMatched.map(booking => (
                    <div
                      key={booking.bookingId}
                      className="flex items-center gap-4 p-4 border rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {booking.hiker.profilePic}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">
                            {booking.hiker.fullName}
                          </h4>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              booking.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {booking.pickupAddress} → {booking.destinationAddress}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                            <Navigation className="w-3 h-3 text-amber-500" />
                            <span className="font-medium">
                              {booking.totalDistance.toFixed(2)} km
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                            <Users className="w-3 h-3 text-indigo-500" />
                            <span className="font-medium">
                              {booking.seatsBooked} Seat
                              {booking.seatsBooked > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                            <Clock className="w-3 h-3 text-rose-600" />
                            {booking.status == 'COMPLETED' && (
                              <p className="text-xs text-muted-foreground">
                                Duration:{' '}
                                {formatDuration(
                                  booking.createdAt,
                                  booking.completedAt!
                                )}
                              </p>
                            )}
                            {booking.status == 'CANCELLED' && (
                              <p className="text-xs text-muted-foreground">
                                CancelledAt:{' '}
                                {booking.cancelledAt &&
                                  formatDate(booking.cancelledAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-green-600 text-lg">
                          ₹{booking.amount - booking.refundAmount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            className="cursor-pointer flex items-center justify-center gap-2 mx-auto mt-8 text-muted-foreground hover:text-foreground font-medium transition-colors group"
            onClick={handleRedirect}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
};
