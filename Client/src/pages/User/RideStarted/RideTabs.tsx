import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HikerList } from './HikersList';

interface Hiker {
  id: number;
  name: string;
  pickup: string;
  destination: string;
  cost: string;
  rating: number;
}

interface RideTabsProps {
  hikers: Hiker[];
  seatsRemaining: number;
}

export function RideTabs({ hikers, seatsRemaining }: RideTabsProps) {
  return (
    <Tabs defaultValue="find" className="flex-1 flex flex-col">
      <TabsList className="grid grid-cols-3 mb-4 bg-white text-black rounded-lg">
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

      <TabsContent value="find" className="flex-1">
        <HikerList hikers={hikers} seatsRemaining={seatsRemaining} />
      </TabsContent>

      <TabsContent value="tasks">
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No active tasks right now.
        </div>
      </TabsContent>

      <TabsContent value="current">
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No hikers currently onboard.
        </div>
      </TabsContent>
    </Tabs>
  );
}
