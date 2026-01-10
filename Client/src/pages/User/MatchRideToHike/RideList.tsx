import { Loader2, RefreshCcw, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { RideCard } from './RideCard';
import type { RideMatchResponseDTO } from '@/types/hike';

export function RideList({
  loading,
  availableRides,
  fetchRides,
  setSelectedRide,
}: {
  loading: boolean;
  availableRides: RideMatchResponseDTO[];
  fetchRides: () => void;
  setSelectedRide: (ride: RideMatchResponseDTO) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-200/60 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Available Rides
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Find your perfect match
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
            <Loader2 size={14} className="animate-spin text-slate-600" />
            <span className="text-xs font-medium text-slate-700">Loading</span>
          </div>
        ) : (
          <button
            className="flex items-center gap-2 font-medium text-black cursor-pointer transition-all duration-300 hover:text-gray-600"
            onClick={fetchRides}
          >
            <RefreshCcw
              size={14}
              className="transition-transform duration-300 hover:rotate-180"
            />
            <span className="text-xs">Refresh</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {!loading && availableRides.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-32">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Car size={28} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-center font-medium text-sm">
              No rides found nearby
            </p>
            <p className="text-slate-400 text-xs text-center mt-1">
              Try refreshing or check back later
            </p>
          </div>
        )}

        {availableRides.map(ride => (
          <motion.div key={ride.rideId}>
            <RideCard ride={ride} setSelectedRide={setSelectedRide} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
