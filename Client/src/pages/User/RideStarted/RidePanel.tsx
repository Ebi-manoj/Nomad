import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RideHeader } from './RideHeader';
import { RideStats } from './RideStats';
import type { RideData } from '@/store/features/user/ride/ride';
import { endRide } from '@/api/ride';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/utils/HandleApiError';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RidePanelProps {
  rideData: RideData;
  showDetails: boolean;
  setShowDetails: (val: boolean) => void;
}

export function RidePanel({
  rideData,
  showDetails,
  setShowDetails,
}: RidePanelProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEndRide = async () => {
    setLoading(true);
    try {
      await endRide(rideData.id);
      navigate(`/ride/${rideData.id}`, { replace: true });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 h-full w-[400px] sm:w-[40%]
      bg-gradient-to-br from-white/95 to-gray-100/90 backdrop-blur-lg
      border-r border-gray-300 shadow-[6px_0_30px_-10px_rgba(0,0,0,0.2)]
      z-40 transform transition-transform duration-500 ease-in-out
      ${showDetails ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-6 flex flex-col h-full">
        <RideHeader
          pickup={rideData?.pickupAddress}
          destination={rideData?.destinationAddress}
          onClose={() => setShowDetails(false)}
        />
        <Separator className="mb-4" />
        <RideStats
          vehicleModel={rideData?.vehicleModel}
          vehicleNumber={rideData?.vehicleNumber}
          totalDistance={rideData?.totalDistance.toFixed(2)}
          costSharing={rideData?.costSharing}
        />

        <Button
          className="mt-6 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold w-full py-3 rounded-xl shadow-md hover:shadow-lg
         hover:from-red-700 hover:to-red-600 transition cursor-pointer"
          onClick={handleEndRide}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'End Ride'}
        </Button>
      </div>
    </div>
  );
}
