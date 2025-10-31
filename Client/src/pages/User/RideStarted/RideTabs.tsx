import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HikerList } from './HikersList';
import type { RideRequestDTO } from '@/types/ride';

interface RideTabsProps {
  hikers: RideRequestDTO[];
  seatsRemaining: number;
}

export function RideTabs({ hikers, seatsRemaining }: RideTabsProps) {
  const handleAccept = (requestId: string) => {
    console.log('Accepted:', requestId);
    // TODO: Implement accept logic
  };

  const handleDecline = (requestId: string) => {
    console.log('Declined:', requestId);
    // TODO: Implement decline logic
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
        />
      </TabsContent>

      <TabsContent value="tasks" className="flex-1 mt-0">
        <div className="h-full flex items-center justify-center text-gray-500">
          No active tasks right now.
        </div>
      </TabsContent>

      <TabsContent value="current" className="flex-1 mt-0">
        <div className="h-full flex items-center justify-center text-gray-500">
          No hikers currently onboard.
        </div>
      </TabsContent>
    </Tabs>
  );
}
