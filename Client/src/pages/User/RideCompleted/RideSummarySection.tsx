import type { GetRideDetailsResDTO } from '@/types/ride';
import { formatDuration } from '@/utils/dateFormater';
import { MapPin, Navigation, Car, Clock, Star, Wallet } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa6';

interface RideSummarySectionProps {
  rideData: GetRideDetailsResDTO;
  grossCollected: number;
  netEarnings: number;
  platformFee: number;
}

export const RideSummarySection = ({
  rideData,
  grossCollected,
  netEarnings,
  platformFee,
}: RideSummarySectionProps) => {
  const avgPerPassenger =
    rideData.hikersMatched.length > 0
      ? Math.round(rideData.totalCostShared / rideData.hikersMatched.length)
      : 0;

  return (
    <>
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
            <p className="text-3xl font-bold text-green-600">₹{avgPerPassenger}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Trip Details</h2>
          <p className="text-xs text-muted-foreground">ID: {rideData.rideId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {/* Pickup */}
        <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Start Location</p>
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
            <p className="text-muted-foreground text-sm">End Location</p>
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
            <p className="text-muted-foreground text-sm">Distance Covered</p>
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
            <p className="text-muted-foreground text-sm">Trip Duration</p>
            <p className="font-semibold text-base text-foreground">
              {formatDuration(rideData.createdAt, rideData.completedAt!)}
            </p>
          </div>
        </div>

        {/* Vehicle */}
        <div className="flex items-start gap-3 p-4 border rounded-xl bg-muted/30">
          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Car className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Your Vehicle</p>
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
            <p className="font-semibold text-base text-foreground">4.8 / 5.0</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Financial Breakdown</h3>
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
    </>
  );
};
