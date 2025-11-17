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

export function RideStartedContent() {
  const [showChat, setShowChat] = useState<ChatInterfaceProps | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const { rideData } = useSelector((state: RootState) => state.ride);
  const [rideRequests, setRideRequest] = useState<RideRequestDTO[]>([]);

  const { riderSocket } = useSocket();
  const dispatch = useAppDispatch();
  if (!rideData) return <Navigate to="/ride" replace />;

  useEffect(() => {
    const fetchPendingReq = async () => {
      try {
        const data = await getJoinRequest(rideData.id);
        setRideRequest(data);
      } catch (error) {}
    };
    fetchPendingReq();
    dispatch(fetchRiderTasks(rideData.id));
    dispatch(fetchMatchedHikers(rideData.id));
  }, [rideData, dispatch]);

  useEffect(() => {
    if (!riderSocket.connected) {
      riderSocket.connect();
    }
    riderSocket.emit('ride:join', rideData.id);

    riderSocket.on('join-request:new', (data: RideRequestDTO) => {
      console.log(' New Join Request Received:', data);
      setRideRequest(prev => [...prev, data]);
    });

    riderSocket.on('hike:confirmed', async () => {
      dispatch(fetchRiderTasks(rideData.id));
      dispatch(fetchMatchedHikers(rideData.id));
    });

    return () => {
      riderSocket.off('join-request:new');
      riderSocket.off('hike:confirmed');
      riderSocket.disconnect();
    };
  }, [rideData, riderSocket, dispatch]);

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
      <div className="w-full sm:w-[600px] border-l border-gray-200 bg-white shadow-sm p-4 flex flex-col">
        {!showChat && (
          <RideTabs
            hikers={rideRequests}
            seatsRemaining={rideData.seatsAvailable}
            setRideRequest={setRideRequest}
            onCompleteTask={handleCompleteTask}
            onChatClick={handleChatClick}
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
    </div>
  );
}
