import {
  MapPin,
  Flag,
  Car,
  Star,
  XCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { CreateJoinRequestDTO, RideMatchResponseDTO } from '@/types/hike';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { joinRide } from '@/api/hike';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/HandleApiError';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '@/components/ProfilePic';

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
  const [joinLoading, setJoinLoading] = useState(false);
  useEffect(() => {
    setRequestStatus(ride.requestStatus);
  }, [ride]);

  const handleJoinRide = async () => {
    try {
      setJoinLoading(true);
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
      handleApiError(error);
    } finally {
      setJoinLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleMakePayment = (id: string | null) => {
    if (!id) return;
    navigate(`/payment/${id}`);
  };

  return (
    <motion.div
      className="relative bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-300"
      whileHover={{ scale: 1.01, y: -2 }}
    >
      {ride.user.safetyScore >= 80 && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md text-white">
            <ShieldCheck size={12} />
            <span className="text-xs font-bold tracking-wide">
              Nomad suggested
            </span>
          </div>
        </div>
      )}
      {/* Accepted Badge */}
      {requestStatus === 'accepted' && (
        <div className="absolute -top-2 right-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-md text-white">
            <CheckCircle2 size={12} fill="white" />
            <span className="text-xs font-bold tracking-wide">Accepted</span>
          </div>
        </div>
      )}

      {/* Rider Info */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2.5">
          <UserAvatar
            subscriptionTier={ride.user.subscriptionTier}
            badgeColor={ride.user.badgeColor}
            showBadge
            fullName={ride.user.fullName}
          />
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
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck size={11} />
                <span className="font-semibold">{ride.user.safetyScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900">
            ₹{ride.costSharing}
          </p>
          <p className="text-[10px] text-slate-500">per km</p>
        </div>
      </div>

      {/* Vehicle info */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-full mb-3 border border-slate-200">
        <Car size={11} className="text-slate-700" />
        <span className="text-[11px] font-semibold text-slate-700">
          {ride.user.vehicleModal}
        </span>
      </div>

      {/* Route Summary */}
      <div className="bg-slate-50 rounded-lg p-2.5 mb-3 border border-slate-200/40">
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

      {/* Ride Details */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        <RideDetail label="Departure" value={`${ride.departure} min`} />
        <RideDetail label="Seats Left" value={ride.seatsLeft} />
        <RideDetail label="Duration" value={`${ride.duration} min`} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1.5 items-center">
        <button
          className="cursor-pointer flex-1 border-2 border-slate-900 text-slate-900 py-1.5 rounded-lg font-semibold text-xs hover:bg-slate-900 hover:text-white transition-all duration-200"
          onClick={() => setSelectedRide(ride)}
        >
          Show Route
        </button>

        {requestStatus === null ? (
          <button
            className="cursor-pointer flex-1 bg-black text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-900 transition-all duration-200 shadow-md active:scale-[0.98] disabled:opacity-60"
            onClick={handleJoinRide}
            disabled={joinLoading}
            type="button"
          >
            {joinLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </span>
            ) : (
              'Join Ride'
            )}
          </button>
        ) : requestStatus === 'pending' ? (
          <div className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-amber-50 text-amber-700 font-semibold text-sm border border-amber-200 select-none">
            <Clock className="w-4 h-4 mr-1 animate-pulse" />
            Request Sent
          </div>
        ) : requestStatus === 'accepted' ? (
          <motion.button
            className="flex-1 relative bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 cursor-pointer rounded-lg font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-[0.98] overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMakePayment(ride.paymentId)}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Make Payment
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>

            {/* Glow effect on hover */}
            <motion.div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        ) : (
          <div className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-red-50 text-red-700 font-semibold text-sm border border-red-200 select-none">
            <XCircle className="w-4 h-4 mr-1" />
            Request Declined
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
