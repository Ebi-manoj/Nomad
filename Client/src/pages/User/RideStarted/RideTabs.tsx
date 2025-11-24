import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HikerList } from './HikersList';
import { TasksList } from './TasksList';
import { CurrentHikersList } from './CurrentHikersList';
import type { RideRequestDTO } from '@/types/ride';
import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';
import { acceptJoinRequest, declineJoinRequest } from '@/api/ride';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

interface RideTabsProps {
  hikers: RideRequestDTO[];
  seatsRemaining: number;
  setRideRequest: React.Dispatch<React.SetStateAction<RideRequestDTO[]>>;
  onCompleteTask: (taskId: string, otp?: string) => void;
  onChatClick: (hiker: GetHikersMatchedResponseDTO) => void;
  handleRefresh: () => void;
}

export function RideTabs({
  hikers,
  seatsRemaining,
  setRideRequest,
  onCompleteTask,
  onChatClick,
  handleRefresh,
}: RideTabsProps) {
  const tasks = useSelector((state: RootState) => state.riderTasks.tasks);
  const currentHikers = useSelector(
    (state: RootState) => state.matchedHikers.hikers
  );
  const handleAccept = async (requestId: string) => {
    try {
      const data = await acceptJoinRequest(requestId);
      setRideRequest(prev =>
        prev.map(req =>
          req.id == requestId ? { ...req, status: data.status } : req
        )
      );
    } catch (error) {
      useHandleApiError(error);
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineJoinRequest(requestId);
      setRideRequest(prev =>
        prev.map(req =>
          req.id == requestId ? { ...req, status: 'declined' } : req
        )
      );
    } catch (error) {
      useHandleApiError(error);
    }
  };

  return (
    <Tabs defaultValue="find" className="flex-1 flex flex-col h-full">
      <TabsList className="grid grid-cols-3 mb-4 bg-white text-black rounded-lg flex-shrink-0">
        <TabsTrigger
          value="find"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md cursor-pointer"
        >
          Find Hikers
        </TabsTrigger>
        <TabsTrigger
          value="tasks"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md cursor-pointer"
        >
          Tasks
        </TabsTrigger>
        <TabsTrigger
          value="current"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md cursor-pointer"
        >
          Current
        </TabsTrigger>
      </TabsList>

      <TabsContent value="find" className="flex-1 mt-0 overflow-hidden">
        <HikerList
          requests={hikers}
          seatsRemaining={seatsRemaining}
          onAccept={handleAccept}
          onDecline={handleDecline}
          handleRefresh={handleRefresh}
        />
      </TabsContent>

      <TabsContent value="tasks" className="flex-1 mt-0 overflow-hidden">
        <TasksList tasks={tasks} onCompleteTask={onCompleteTask} />
      </TabsContent>

      <TabsContent value="current" className="flex-1 mt-0 overflow-hidden">
        <CurrentHikersList hikers={currentHikers} onChatClick={onChatClick} />
      </TabsContent>
    </Tabs>
  );
}
