import { MapPin, Flag, Car, Star, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CreateJoinRequestDTO, RideMatchResponseDTO } from '@/types/hike';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { joinRide } from '@/api/hike';
import { toast } from 'sonner';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { useState } from 'react';

export function RideCard({
  ride,
  setSelectedRide,
}: {
  ride: RideMatchResponseDTO;
  setSelectedRide: (ride: RideMatchResponseDTO) => void;
}) {
  const { hikeData } = useSelector((state: RootState) => state.hike);
  if (!hikeData) return;
  const [requestStatus, setRequestStatus] = useState(ride.requestStatus);

  const handleJoinRide = async () => {
    try {
      const payload: CreateJoinRequestDTO = {
        rideId: ride.rideId,
        hikeId: hikeData?.id,
        pickupLocation: ride.nearestPickup,
        dropoffLocation: ride.nearestDestination,
      };
      await joinRide(payload);
      setRequestStatus('pending');
      toast.success('Request sent to the rider');
    } catch (error) {
      useHandleApiError(error);
    }
  };

  return (
    <motion.div
      className="bg-white border border-slate-200/60 rounded-xl p-3.5 shadow-sm hover:shadow-lg hover:border-slate-300/60 transition-all duration-300"
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            {ride.user.fullName.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {ride.user.fullName}
            </h3>
            <div className="flex items-center gap-1.5 text-[11px]">
              <div className="flex items-center text-amber-500">
                <Star size={11} fill="currentColor" />
                <span className="ml-0.5 font-semibold text-slate-900">4.8</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{ride.user.vehicleType}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            ₹{ride.costSharing}
          </p>
          <p className="text-[10px] text-slate-500">per km</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full mb-2.5 border border-slate-200/60">
        <Car size={11} className="text-slate-700" />
        <span className="text-[11px] font-semibold text-slate-700">
          {ride.user.vehicleModal}
        </span>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg p-2.5 mb-2.5 border border-slate-200/40">
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-1 text-green-600">
            <MapPin size={13} fill="currentColor" />
            <span className="font-medium text-slate-700">
              {ride.distanceAwayfromPickup} km
            </span>
          </div>
          <div className="flex-1 flex items-center gap-1.5">
            <div className="h-px flex-1 bg-gradient-to-r from-green-400 via-slate-300 to-red-400"></div>
            <Car size={13} className="text-slate-400" />
            <div className="h-px flex-1 bg-gradient-to-r from-slate-300 via-slate-300 to-red-400"></div>
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <Flag size={13} fill="currentColor" />
            <span className="font-medium text-slate-700">
              {ride.distanceAwayfromDestination} km
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        <RideDetail label="Departure" value={`${ride.departure} min`} />
        <RideDetail label="Seats Left" value={ride.seatsLeft} />
        <RideDetail label="Duration" value={`${ride.duration} min`} />
      </div>

      <div className="flex gap-1.5 items-center">
        {/* Show Route Button */}
        <button
          className="flex-1 border-2 cursor-pointer border-slate-900 text-slate-900 py-1.5 rounded-lg font-semibold text-xs hover:bg-slate-900 hover:text-white transition-all duration-200 hover:shadow-lg"
          onClick={() => setSelectedRide(ride)}
        >
          Show Route
        </button>

        {requestStatus === null ? (
          <button
            className="flex-1 bg-black text-white py-2.5 cursor-pointer rounded-lg font-semibold text-sm hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            onClick={handleJoinRide}
          >
            Join Ride
          </button>
        ) : requestStatus === 'pending' ? (
          <div className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-amber-50 text-amber-700 font-semibold text-sm border border-amber-200 select-none">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 animate-pulse" />
              Request Sent
            </span>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-red-50 text-red-700 font-semibold text-sm border border-red-200 select-none">
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Request Declined
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RideDetail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="text-center p-1.5 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/40">
      <p className="text-[10px] text-slate-500 mb-0.5">{label}</p>
      <p className="text-xs font-bold text-slate-900">{value}</p>
    </div>
  );
}
