import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { FIND_MATCH_RIDES_API } from '@/api/hike';
import { toast } from 'sonner';
import type { RideMatchResponseDTO } from '@/types/hike';
import type { RootState } from '@/store/store';
import { AnimatePresence, motion } from 'framer-motion';
import { HikePanel } from './HikePanel';
import { TogglePanelButton } from './TogglePanelButton';
import { RideList } from './RideList';
import { ToggleRideButton } from './ToggleRideButton';
import { MatchRideMap } from './MatchRideMap';
import { useSocket } from '@/context/SocketContext';
import type {
  AcceptJoinResponseDTO,
  DeclineJoinResponseDTO,
} from '@/types/ride';

export function RideMatching() {
  const { hikeData } = useSelector((state: RootState) => state.hike);
  const navigate = useNavigate();
  const [showHikePanel, setShowHikePanel] = useState(true);
  const [availableRides, setAvailableRides] = useState<RideMatchResponseDTO[]>(
    []
  );
  const [selectedRide, setSelectedRide] = useState<RideMatchResponseDTO | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showRideList, setShowRideList] = useState(false);

  if (!hikeData) return <Navigate to="/hike" replace />;
  useEffect(() => {
    if (hikeData?.confirmed && hikeData?.bookingId) {
      navigate(`/hike/started/${hikeData.bookingId}`, { replace: true });
    }
  }, [hikeData, navigate]);

  const { hikerSocket } = useSocket();
  useEffect(() => {
    const onConnect = () => {
      hikerSocket.emit('hike:join', hikeData.id);
    };

    // register first to avoid race
    hikerSocket.on('connect', onConnect);

    if (!hikerSocket.connected) {
      hikerSocket.connect();
    } else {
      onConnect();
    }

    hikerSocket.on('joinRequest:accepted', (data: AcceptJoinResponseDTO) => {
      console.log('Join accepted', data);
      navigate(`/payment/${data.paymentId}`);
    });
    hikerSocket.on('joinRequest:declined', (data: DeclineJoinResponseDTO) => {
      console.log('Join declined', data);
      setAvailableRides(prev => {
        console.log('prev', prev);
        const updated = prev.map(r => {
          console.log(r.rideId == data.rideId);
          return r.rideId == data.rideId
            ? { ...r, requestStatus: data.status }
            : { ...r };
        });
        console.log('updated', updated);
        return updated;
      });
    });
    return () => {
      hikerSocket.off('connect', onConnect);
      hikerSocket.off('joinRequest:accepted');
      hikerSocket.off('joinRequest:declined');
    };
  }, [hikeData.id, hikerSocket, navigate]);

  const fetchRides = async () => {
    if (!hikeData?.id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post<{ data: RideMatchResponseDTO[] }>(
        FIND_MATCH_RIDES_API,
        { hikeId: hikeData.id }
      );
      console.log(res.data.data);
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

      <ToggleRideButton
        showRideList={showRideList}
        setShowRideList={setShowRideList}
        availableCount={availableRides.length}
      />

      <div className="flex flex-1 h-screen relative">
        {/* Desktop Ride List */}
        <div className="hidden md:block w-[45%] h-full border-r border-slate-200/60 relative z-10">
          <RideList
            loading={loading}
            availableRides={availableRides}
            fetchRides={fetchRides}
            setSelectedRide={setSelectedRide}
          />
        </div>

        {/* Mobile Ride List Drawer */}
        <AnimatePresence>
          {showRideList && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowRideList(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-[85%] sm:w-[400px] bg-white z-40 md:hidden shadow-2xl border-l border-slate-200"
              >
                <div className="h-full pt-16 sm:pt-0">
                  <RideList
                    loading={loading}
                    availableRides={availableRides}
                    fetchRides={fetchRides}
                    setSelectedRide={setSelectedRide}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Map Container - Full screen on mobile, Right side on desktop */}
        <div className="w-full md:w-[55%] h-screen flex justify-center items-center bg-slate-50/30 absolute md:static inset-0 z-0">
          <MatchRideMap hike={hikeData} selectedRide={selectedRide} />
        </div>
      </div>
    </div>
  );
}
