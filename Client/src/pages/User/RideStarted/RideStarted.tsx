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
import type { Task } from '@/types/task';
import { getJoinRequest, getTasks } from '@/api/ride';

export function RideStartedContent() {
  const [showDetails, setShowDetails] = useState(true);
  const { rideData } = useSelector((state: RootState) => state.ride);
  const [rideRequests, setRideRequest] = useState<RideRequestDTO[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { riderSocket } = useSocket();
  if (!rideData) return <Navigate to="/ride" replace />;

  useEffect(() => {
    const fetchPendingReq = async () => {
      try {
        const data = await getJoinRequest(rideData.id);
        setRideRequest(data);
      } catch (error) {}
    };

    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks(rideData.id);
        setTasks(tasksData);
      } catch (error) {}
    };

    fetchPendingReq();
    fetchTasks();
  }, [rideData]);

  useEffect(() => {
    if (!riderSocket.connected) {
      riderSocket.connect();
    }
    riderSocket.emit('ride:join', rideData.id);

    riderSocket.on('join-request:new', (data: RideRequestDTO) => {
      console.log(' New Join Request Received:', data);
      setRideRequest(prev => [...prev, data]);
    });

    return () => {
      riderSocket.off('join-request:new');
      riderSocket.off('payment:confirmed');
      riderSocket.disconnect();
    };
  }, [rideData, riderSocket]);

  const handleCompleteTask = (taskId: string, otp?: string) => {
    console.log('Completing task:', taskId, 'with OTP:', otp);

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: 'COMPLETED' as const } : task
      )
    );
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
        <RideTabs
          hikers={rideRequests}
          seatsRemaining={rideData.seatsAvailable}
          setRideRequest={setRideRequest}
          tasks={tasks}
          onCompleteTask={handleCompleteTask}
        />
      </div>
    </div>
  );
}
