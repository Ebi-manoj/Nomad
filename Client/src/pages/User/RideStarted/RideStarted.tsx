import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import { RidePanel } from './RidePanel';
import { RideTabs } from './RideTabs';
import type { RootState } from '@/store/store';
import { RideMap } from './RideMap';
import { useSocket } from '@/context/SocketContext';
import type { RideRequestDTO } from '@/types/ride';
import { getJoinRequest } from '@/api/ride';
import ChatInterface from '../../../components/ChatInterface';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  completeTask,
  fetchRiderTasks,
} from '@/store/features/user/riderTasks/riderTasks.thunk';
import { fetchMatchedHikers } from '@/store/features/user/matchedHikers/matchedHikers.thunk';
import type { ChatInterfaceProps } from '@/types/chat';
import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';
import { toast } from 'sonner';
import { updateSeats } from '@/store/features/user/ride/rideSlice';
import { SosButton } from '@/components/SosButton';
import type { TriggerSosRiderDTO } from '@/types/sos';
import { triggerSosRider } from '@/api/sos';
import { handleApiError } from '@/utils/HandleApiError';
import { ToggleRightPanelButton } from './ToggleRightPanelButton';
import { AnimatePresence, motion } from 'framer-motion';

export function RideStartedContent() {
  const [showChat, setShowChat] = useState<ChatInterfaceProps | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const { rideData } = useSelector((state: RootState) => state.ride);
  const [rideRequests, setRideRequest] = useState<RideRequestDTO[]>([]);

  const { riderSocket } = useSocket();
  const dispatch = useAppDispatch();
  if (!rideData) return <Navigate to="/ride" replace />;
  console.log(rideData);
  const fetchPendingReq = async () => {
    try {
      const data = await getJoinRequest(rideData.id);
      setRideRequest(data);
    } catch (error) {}
  };

  const handleRefresh = () => {
    fetchPendingReq();
    dispatch(fetchRiderTasks(rideData.id));
    dispatch(fetchMatchedHikers(rideData.id));
  };

  useEffect(() => {
    fetchPendingReq();
    dispatch(fetchRiderTasks(rideData.id));
    dispatch(fetchMatchedHikers(rideData.id));
  }, [rideData, dispatch]);

  useEffect(() => {
    const onConnect = () => {
      riderSocket.emit('ride:join', rideData.id);
    };
    riderSocket.on('connect', onConnect);

    if (!riderSocket.connected) {
      riderSocket.connect();
    } else {
      onConnect();
    }

    return () => {
      riderSocket.off('connect', onConnect);
    };
  }, [riderSocket, rideData.id]);

  useEffect(() => {
    riderSocket.on('join-request:new', (data: RideRequestDTO) => {
      console.log(' New Join Request Received:', data);
      setRideRequest(prev => [...prev, data]);
    });

    riderSocket.on('ride:deviated', data => {
      toast.warning(data.message);
    });

    riderSocket.on('hike:confirmed', async data => {
      dispatch(fetchRiderTasks(rideData.id));
      dispatch(fetchMatchedHikers(rideData.id));
      dispatch(updateSeats(data.seatsLeft));
    });

    return () => {
      riderSocket.off('join-request:new');
      riderSocket.off('hike:confirmed');
      riderSocket.off('ride:deviated');
    };
  }, []);

  const handleCompleteTask = async (taskId: string, otp?: string) => {
    try {
      console.log('Completing task:', taskId, 'with OTP:', otp);
      await dispatch(completeTask({ taskId, otp })).unwrap();
    } catch (error) {
      toast.error(typeof error == 'string' && error);
    }
  };

  const handleChatClick = (hiker: GetHikersMatchedResponseDTO) => {
    const { user, hikeDetails } = hiker;
    setShowChat({
      onBack: handleChatBack,
      role: 'rider',
      user: {
        name: user.fullName,
        rating: user.rating,
        profilePic: user.profilePic,
        verified: user.isVerified,
        socketId: hikeDetails.hikeId,
      },
    });
  };

  const handleChatBack = () => {
    setShowChat(null);
  };

  const handleTriggerSos = async () => {
    console.log('SOS TRIGGERED');
    const dto: TriggerSosRiderDTO = { rideId: rideData.id };
    try {
      await triggerSosRider(dto);
      toast.warning('SOS Triggered successfully', {
        description: 'Our support team reach you soon',
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-black overflow-hidden relative">
      <ToggleRightPanelButton
        showRightPanel={showRightPanel}
        setShowRightPanel={setShowRightPanel}
        requestCount={rideRequests.length}
      />

      {/* LEFT SECTION WITH MAP AND PANEL */}
      <div className="relative flex-1 bg-gray-100 overflow-hidden">
        {/* Toggle Button for Left Panel - Visible on Mobile if panel is hidden, or always on Desktop if panel hidden logic applies there (keeping existing logic for desktop, ensuring mobile access) */}
        {!showDetails && (
          <button
            onClick={() => setShowDetails(true)}
            className="absolute top-5 left-5 z-50 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-md transition cursor-pointer"
          >
            <ArrowRightCircle size={22} />
          </button>
        )}
        
        {/* Map takes full space */}
        <RideMap
          pickup={rideData.pickupAddress}
          destination={rideData.destinationAddress}
          rideId={rideData.id}
        />

        {/* Left Panel - Responsive Drawer */}
        <RidePanel
          rideData={rideData}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </div>

      {/* RIGHT SIDEBAR - DESKTOP */}
      <div className="hidden md:flex w-full sm:w-[500px] lg:w-[600px] border-l border-gray-200 bg-white shadow-sm p-4 flex-col z-20">
        {!showChat && (
          <RideTabs
            hikers={rideRequests}
            seatsRemaining={rideData.seatsAvailable}
            setRideRequest={setRideRequest}
            onCompleteTask={handleCompleteTask}
            onChatClick={handleChatClick}
            handleRefresh={handleRefresh}
          />
        )}

        {showChat && (
          <ChatInterface
            onBack={handleChatBack}
            role={showChat.role}
            user={showChat.user}
          />
        )}
      </div>

      {/* RIGHT SIDEBAR - MOBILE DRAWER */}
      <AnimatePresence>
        {showRightPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRightPanel(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] sm:w-[400px] bg-white z-40 md:hidden shadow-2xl border-l border-slate-200 flex flex-col pt-16"
            >
              <div className="flex-1 overflow-y-auto p-4">
                  {!showChat && (
                    <RideTabs
                      hikers={rideRequests}
                      seatsRemaining={rideData.seatsAvailable}
                      setRideRequest={setRideRequest}
                      onCompleteTask={handleCompleteTask}
                      onChatClick={handleChatClick}
                      handleRefresh={handleRefresh}
                    />
                  )}

                  {showChat && (
                    <ChatInterface
                      onBack={handleChatBack}
                      role={showChat.role}
                      user={showChat.user}
                    />
                  )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed rounded-full w-12 h-12 bottom-10 right-6 z-10 md:z-0">
        <SosButton handleClick={handleTriggerSos} />
      </div>
    </div>
  );
}
