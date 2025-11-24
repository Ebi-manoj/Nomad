import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HikeLogs } from './HikeLogs';

export const ActivityPage = () => {
  return (
    <div className="w-full p-4">
      <Tabs defaultValue="hike" className="w-full flex flex-col items-center">
        {/* TAB SWITCHER */}
        <TabsList className="grid grid-cols-2 w-full max-w-sm rounded-md border border-black p-0 bg-white">
          <TabsTrigger
            value="hike"
            className="p-2 cursor-pointer text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:rounded-r-none 
                         font-semibold"
          >
            HIKE
          </TabsTrigger>

          <TabsTrigger
            value="ride"
            className="p-2 cursor-pointer text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:rounded-l-none
                         font-semibold"
          >
            RIDE
          </TabsTrigger>
        </TabsList>

        {/* CONTENT */}
        <div className="w-full">
          <TabsContent value="hike">
            <HikeLogs />
          </TabsContent>

          <TabsContent value="ride">No Rides</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
