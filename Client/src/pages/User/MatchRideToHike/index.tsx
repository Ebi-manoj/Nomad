import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { FIND_MATCH_RIDES_API } from '@/api/hike';
import { toast } from 'sonner';
import type { RideMatchResponseDTO } from '@/types/hike';
import type { RootState } from '@/store/store';
import { AnimatePresence } from 'framer-motion';
import { HikePanel } from './HikePanel';
import { TogglePanelButton } from './TogglePanelButton';
import { RideList } from './RideList';
import { MatchRideMap } from './MatchRideMap';

export function RideMatching() {
  const { hikeData } = useSelector((state: RootState) => state.hike);
  const [showHikePanel, setShowHikePanel] = useState(true);
  const [availableRides, setAvailableRides] = useState<RideMatchResponseDTO[]>(
    []
  );
  const [selectedRide, setSelectedRide] = useState<RideMatchResponseDTO | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  if (!hikeData) return <Navigate to="/hike" replace />;

  const fetchRides = async () => {
    if (!hikeData?.id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post<{ data: RideMatchResponseDTO[] }>(
        FIND_MATCH_RIDES_API,
        { hikeId: hikeData.id }
      );
      setAvailableRides(res.data.data);
    } catch {
      toast.error('Fetching rides failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [hikeData?.id]);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 overflow-hidden">
      <AnimatePresence>
        {showHikePanel && <HikePanel hikeData={hikeData} />}
      </AnimatePresence>

      <TogglePanelButton
        showHikePanel={showHikePanel}
        setShowHikePanel={setShowHikePanel}
      />

      <div className="flex flex-1 h-screen">
        <RideList
          loading={loading}
          availableRides={availableRides}
          fetchRides={fetchRides}
          setSelectedRide={setSelectedRide}
        />
        <div className="w-[55%] h-screen flex justify-center items-center bg-slate-50/30">
          <MatchRideMap hike={hikeData} selectedRide={selectedRide} />
        </div>
      </div>
    </div>
  );
}
