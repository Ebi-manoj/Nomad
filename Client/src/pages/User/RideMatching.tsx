import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Navigate } from 'react-router-dom';
import { MapPin, Flag, Car, Star } from 'lucide-react';
import { MapComponent } from '@/components/MapComponent';
import { RefreshCcw } from 'lucide-react';

export function RideMatching() {
  const rides = [
    {
      id: 1,
      riderName: 'Arjun Kumar',
      rating: 4.8,
      costShare: 120,
      vehicleName: 'Swift Dzire',
      vehicleType: 'Car',
      pickup: 'MG Road, Kochi',
      destination: 'Infopark, Kakkanad',
      pickupDistance: 2.7,
      destinationDistance: 1.0,
    },
    {
      id: 2,
      riderName: 'Rahul Nair',
      rating: 4.6,
      costShare: 80,
      vehicleName: 'Yamaha FZ',
      vehicleType: 'Bike',
      pickup: 'Palarivattom',
      destination: 'Edappally Lulu Mall',
      pickupDistance: 1.2,
      destinationDistance: 0.8,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* LEFT SIDE — Available Rides */}
      <div className="w-full md:w-[45%] h-screen overflow-y-auto border-r border-gray-200 bg-white">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Available Rides</h2>
            <p className="text-sm text-gray-500 mt-1">
              Find your perfect match
            </p>
          </div>

          {/* Refresh Button */}
          <button className="flex items-center gap-2 font-medium cursor-pointer hover:text-gray-600 text-black">
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>

        <div className="p-6 space-y-4">
          {rides.map(ride => (
            <motion.div
              key={ride.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.01, y: -2 }}
            >
              {/* Rider Info Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {ride.riderName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {ride.riderName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1 font-semibold text-gray-900">
                          {ride.rating}
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{ride.vehicleType}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{ride.costShare}
                  </p>
                  <p className="text-xs text-gray-500">per ride</p>
                </div>
              </div>

              {/* Vehicle Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-4">
                <Car size={14} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  {ride.vehicleName}
                </span>
              </div>

              {/* Route Info - Single Line */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <MapPin size={16} fill="currentColor" />
                    <span className="font-medium text-gray-700">
                      {ride.pickupDistance} km
                    </span>
                  </div>

                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-green-400 via-gray-300 to-red-400"></div>
                    <Car size={16} className="text-gray-400" />
                    <div className="h-px flex-1 bg-gradient-to-r from-gray-300 via-gray-300 to-red-400"></div>
                  </div>

                  <div className="flex items-center gap-1.5 text-red-600">
                    <Flag size={16} fill="currentColor" />
                    <span className="font-medium text-gray-700">
                      {ride.destinationDistance} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Departure</p>
                  <p className="text-sm font-semibold text-gray-900">4:30 PM</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Seats Left</p>
                  <p className="text-sm font-semibold text-gray-900">2</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">25 min</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 border-2 border-gray-900 text-gray-900 py-2.5 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200">
                  Show Route
                </button>
                <button className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl font-semibold hover:bg-black transition-all duration-200 shadow-lg shadow-gray-900/20">
                  Join Ride
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — Map Area */}
      <div className="w-full md:w-[55%] h-screen flex justify-center items-center relative">
        <MapComponent />
      </div>
    </div>
  );
}
