import { MapPin, Flag, Users, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Navigate } from 'react-router-dom';

export function RideMatching() {
  const hike = {
    pickupAddress: 'Ernakulam South Railway Station, Kochi, Kerala',
    destinationAddress: 'Infopark, Kakkanad, Kerala',
    totalDistance: 12.3,
    seatsRequested: 1,
    estimatedPrice: 35,
    status: 'searching',
    createdAt: '2025-10-17T08:30:00Z',
  };

  const { hikeData } = useSelector((state: RootState) => state.hike);
  console.log(hikeData);
  if (!hikeData) {
    return <Navigate to={'/hike'} replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row justify-center pt-6 pb-10 px-5 bg-white">
      {/* Left Side - Hike Details */}
      <div className="w-full lg:w-[45%] max-w-md bg-white border border-gray-100 rounded-3xl shadow-2xl p-7 space-y-5 md:mr-10 transform scale-[0.9] origin-top md:mt-0 mt-20">
        <h2 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight">
          Your Hike Details
        </h2>

        <div className="space-y-3 bg-gray-50 rounded-2xl p-5">
          <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
            <div className="mt-1 p-2 bg-black rounded-lg">
              <MapPin className="text-white" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">PICKUP</p>
              <p className="text-gray-900 text-sm font-medium">
                {hikeData.pickupAddress}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 bg-black rounded-lg">
              <Flag className="text-white" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">
                DESTINATION
              </p>
              <p className="text-gray-900 text-sm font-medium">
                {hikeData.destinationAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Users className="text-black mx-auto mb-2" size={20} />
            <p className="text-xs text-gray-500 mb-1">Seats</p>
            <p className="text-sm font-bold text-gray-900">
              {hikeData.seatsRequested}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Tag className="text-black mx-auto mb-2" size={20} />
            <p className="text-xs text-gray-500 mb-1">Price Estimation</p>
            <p className="text-sm font-bold text-gray-900">
              ₹{hikeData.estimatedPrice}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Clock className="text-black mx-auto mb-2" size={20} />
            <p className="text-xs text-gray-500 mb-1">Distance</p>
            <p className="text-sm font-bold text-gray-900">
              {hike.totalDistance} km
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            onClick={() => console.log('Cancel request')}
          >
            Cancel Ride Request
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center pt-1">
          🔒 Your ride is being searched securely
        </p>
      </div>

      {/* Right Side - Searching Animation */}
      <div className="w-full md:w-[55%] flex justify-center items-center mt-10 md:mt-0 relative">
        <div className="relative w-[280px] h-[280px] flex justify-center items-center">
          {/* Outer pulsating ring */}
          <motion.div
            className="absolute w-[280px] h-[280px] rounded-full border-4 border-gray-900/20"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full border-4 border-gray-700/30"
            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
          {/* Inner glowing dot */}
          <motion.div
            className="w-7 h-7 rounded-full bg-black shadow-[0_0_25px_rgba(0,0,0,0.6)]"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <p className="absolute bottom-[-40px] text-gray-600 text-sm font-medium">
            Finding best match...
          </p>
        </div>
      </div>
    </div>
  );
}
