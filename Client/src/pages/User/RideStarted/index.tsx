import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import { RidePanel } from './RidePanel';
import { RideTabs } from './RideTabs';
import type { RootState } from '@/store/store';
import { RideMap } from './RideMap';

const mockJoinRequests = [
  {
    id: 'req_123456',
    rideId: 'ride_789012',
    status: 'PENDING',
    seatsRequested: 2,
    pickupLocation: {
      type: 'Point',
      coordinates: [76.327, 10.0156],
    },
    dropoffLocation: {
      type: 'Point',
      coordinates: [76.2673, 9.9312],
    },
    estimatedCost: 150,
    message:
      "Hi! I need a ride to the city center. I'm a verified rider with good ratings.",
    createdAt: new Date('2025-10-30T08:30:00'),
    updatedAt: new Date('2025-10-30T08:30:00'),
    hiker: {
      id: 'user_456',
      fullName: 'Priya Sharma',
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      rating: 4.8,
      phoneNumber: '+91 9876543210',
    },
    ride: {
      id: 'ride_789012',
      startLocation: {
        type: 'Point',
        coordinates: [76.35, 10.05],
      },
      endLocation: {
        type: 'Point',
        coordinates: [76.25, 9.9],
      },
      departure: Date.now() + 3600000,
      seatsLeft: 3,
    },
  },
  {
    id: 'req_234567',
    rideId: 'ride_789012',
    status: 'PENDING',
    seatsRequested: 1,
    pickupLocation: {
      type: 'Point',
      coordinates: [76.31, 10.005],
    },
    dropoffLocation: {
      type: 'Point',
      coordinates: [76.27, 9.94],
    },
    estimatedCost: 120,
    createdAt: new Date('2025-10-30T09:15:00'),
    updatedAt: new Date('2025-10-30T09:15:00'),
    hiker: {
      id: 'user_789',
      fullName: 'Rahul Menon',
      rating: 4.5,
    },
    ride: {
      id: 'ride_789012',
      startLocation: {
        type: 'Point',
        coordinates: [76.35, 10.05],
      },
      endLocation: {
        type: 'Point',
        coordinates: [76.25, 9.9],
      },
      departure: Date.now() + 3600000,
      seatsLeft: 3,
    },
  },
  {
    id: 'req_345678',
    rideId: 'ride_789012',
    status: 'PENDING',
    seatsRequested: 1,
    pickupLocation: {
      type: 'Point',
      coordinates: [76.34, 10.03],
    },
    dropoffLocation: {
      type: 'Point',
      coordinates: [76.26, 9.92],
    },
    estimatedCost: 180,
    message: 'Going for an interview. Would really appreciate a ride!',
    createdAt: new Date('2025-10-30T09:45:00'),
    updatedAt: new Date('2025-10-30T09:45:00'),
    hiker: {
      id: 'user_101',
      fullName: 'Anjali Krishnan',
      profilePicture: 'https://i.pravatar.cc/150?img=9',
      rating: 4.9,
      phoneNumber: '+91 9988776655',
    },
    ride: {
      id: 'ride_789012',
      startLocation: {
        type: 'Point',
        coordinates: [76.35, 10.05],
      },
      endLocation: {
        type: 'Point',
        coordinates: [76.25, 9.9],
      },
      departure: Date.now() + 3600000,
      seatsLeft: 3,
    },
  },
];
export function RideStarted() {
  const [showDetails, setShowDetails] = useState(true);
  const { rideData } = useSelector((state: RootState) => state.ride);

  if (!rideData) return <Navigate to="/ride" replace />;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-black overflow-hidden">
      {/* LEFT SECTION */}
      <div className="relative flex-1 bg-gray-100 overflow-hidden">
        {!showDetails && (
          <button
            onClick={() => setShowDetails(true)}
            className="absolute top-5 left-5 z-50 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-md transition cursor-pointer"
          >
            <ArrowRightCircle size={22} />
          </button>
        )}
        <RideMap
          pickup={rideData.pickupAddress}
          destination={rideData.destinationAddress}
          rideId={rideData.id}
        />
        <RidePanel
          rideData={rideData}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full sm:w-[400px] border-l border-gray-200 bg-white shadow-sm p-4 flex flex-col">
        <RideTabs
          hikers={mockJoinRequests}
          seatsRemaining={rideData.seatsAvailable}
        />
      </div>
    </div>
  );
}
