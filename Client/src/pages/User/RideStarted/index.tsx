import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MapComponent } from '@/components/MapComponent';
import { ArrowRightCircle } from 'lucide-react';
import { RidePanel } from './RidePanel';
import { RideTabs } from './RideTabs';
import type { RootState } from '@/store/store';

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
        <MapComponent />
        <RidePanel
          rideData={rideData}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full sm:w-[400px] border-l border-gray-200 bg-white shadow-sm p-4 flex flex-col">
        <RideTabs
          hikers={rideData.hikersMatched && []}
          seatsRemaining={rideData.seatsAvailable}
        />
      </div>
    </div>
  );
}
