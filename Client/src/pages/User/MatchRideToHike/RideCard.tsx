import { MapPin, Flag, Car, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { RideMatchResponseDTO } from '@/types/hike';

export function RideCard({
  ride,
  setSelectedRide,
}: {
  ride: RideMatchResponseDTO;
  setSelectedRide: (ride: RideMatchResponseDTO) => void;
}) {
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

      <div className="flex gap-1.5">
        <button
          className="flex-1 border-2 cursor-pointer border-slate-900 text-slate-900 py-1.5 rounded-lg font-semibold text-xs hover:bg-slate-900 hover:text-white transition-all duration-200 hover:shadow-lg"
          onClick={() => setSelectedRide(ride)}
        >
          Show Route
        </button>
        <button className="flex-1 bg-gradient-to-r cursor-pointer from-slate-900 to-slate-800 text-white py-1.5 rounded-lg font-semibold text-xs hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-md hover:shadow-xl">
          Join Ride
        </button>
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
