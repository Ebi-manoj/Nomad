import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Navigate } from 'react-router-dom';
import { MapPin, Flag, Car, Star, Loader2 } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { FIND_MATCH_RIDES_API } from '@/api/hike';
import { toast } from 'sonner';
import type { RideMatchResponseDTO } from '@/types/hike';
import { MatchRideMap } from './MatchRideMap';

export function RideMatching() {
  const { hikeData } = useSelector((state: RootState) => state.hike);
  const [availableRides, setAvailableRides] = useState<RideMatchResponseDTO[]>(
    []
  );
  const [selectedRide, setSelectedRide] = useState<RideMatchResponseDTO | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  if (!hikeData) return <Navigate to={'/hike'} replace />;
  const fetchRides = async () => {
    if (!hikeData?.id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post<{ data: RideMatchResponseDTO[] }>(
        FIND_MATCH_RIDES_API,
        { hikeId: hikeData.id }
      );
      setAvailableRides(res.data.data);
    } catch (error) {
      toast.error('Fetching rides failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [hikeData?.id]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* LEFT SIDE — Available Rides */}
      <div className="w-full md:w-[45%] h-screen overflow-y-auto border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-5 border-b border-slate-200/60 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Available Rides
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Find your perfect match
            </p>
          </div>

          {/* Loader or Refresh */}
          {loading ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
              <Loader2 size={16} className="animate-spin text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                Loading
              </span>
            </div>
          ) : (
            <button
              onClick={fetchRides}
              className="flex items-center gap-2  font-medium
           text-black cursor-pointer transition-all duration-300
             hover:text-gray-600"
            >
              <RefreshCcw
                size={16}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
              <span className="text-sm">Refresh</span>
            </button>
          )}
        </div>

        <div className="p-5 space-y-3">
          {!loading && availableRides.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-32">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Car size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-center font-medium">
                No rides found nearby
              </p>
              <p className="text-slate-400 text-sm text-center mt-1">
                Try refreshing or check back later
              </p>
            </div>
          )}

          {availableRides.map(ride => (
            <motion.div
              key={ride.rideId}
              className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-slate-300/60 transition-all duration-300"
              whileHover={{ scale: 1.01, y: -2 }}
            >
              {/* Rider Info Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                    {ride.user.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {ride.user.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center text-amber-500">
                        <Star size={13} fill="currentColor" />
                        <span className="ml-0.5 font-semibold text-slate-900">
                          4.8
                        </span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600">
                        {ride.user.vehicleType}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    ₹{ride.costSharing}
                  </p>
                  <p className="text-xs text-slate-500">per km</p>
                </div>
              </div>

              {/* Vehicle Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full mb-3 border border-slate-200/60">
                <Car size={13} className="text-slate-700" />
                <span className="text-xs font-semibold text-slate-700">
                  {ride.user.vehicleModal}
                </span>
              </div>

              {/* Route Info - KEEPING THIS THE SAME */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-3 mb-3 border border-slate-200/40">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <MapPin size={16} fill="currentColor" />
                    <span className="font-medium text-slate-700">
                      {ride.distanceAwayfromPickup} km
                    </span>
                  </div>

                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-green-400 via-slate-300 to-red-400"></div>
                    <Car size={16} className="text-slate-400" />
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-300 via-slate-300 to-red-400"></div>
                  </div>

                  <div className="flex items-center gap-1.5 text-red-600">
                    <Flag size={16} fill="currentColor" />
                    <span className="font-medium text-slate-700">
                      {ride.distanceAwayfromDestination} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/40">
                  <p className="text-xs text-slate-500 mb-0.5">Departure</p>
                  <p className="text-sm font-bold text-slate-900">
                    {ride.departure} min
                  </p>
                </div>
                <div className="text-center p-2 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/40">
                  <p className="text-xs text-slate-500 mb-0.5">Seats Left</p>
                  <p className="text-sm font-bold text-slate-900">
                    {ride.seatsLeft}
                  </p>
                </div>
                <div className="text-center p-2 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/40">
                  <p className="text-xs text-slate-500 mb-0.5">Duration</p>
                  <p className="text-sm font-bold text-slate-900">
                    {ride.duration} min
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 border-2 border-slate-900 text-slate-900 py-2 rounded-xl font-semibold text-sm hover:bg-slate-900 hover:text-white transition-all duration-200 hover:shadow-lg"
                  onClick={() => setSelectedRide(ride)}
                >
                  Show Route
                </button>
                <button className="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2 rounded-xl font-semibold text-sm hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-md hover:shadow-xl">
                  Join Ride
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — Map Area */}
      <div className="w-full md:w-[55%] h-screen flex justify-center items-center relative bg-slate-50/30">
        <MatchRideMap hike={hikeData} selectedRide={selectedRide} />
      </div>
    </div>
  );
}
