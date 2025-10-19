import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { HikerCard } from './HikerCard';

interface Hiker {
  id: number;
  name: string;
  pickup: string;
  destination: string;
  cost: string;
  rating: number;
}

interface HikerListProps {
  hikers: Hiker[];
  seatsRemaining: number;
}

export function HikerList({ hikers, seatsRemaining }: HikerListProps) {
  return (
    <Card className="h-full border border-gray-200 flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1 relative">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-700">
            Seats Remaining: {seatsRemaining}
          </h3>
        </div>
        <div className="mt-3 flex justify-between mb-2 items-center">
          <p className="text-gray-700 text-xs">Available hikers</p>
          <Loader2 size={14} className="mr-1 animate-spin" />
        </div>
        <div className="mb-3 border-b" />
        <ScrollArea className="flex-1 space-y-4">
          {hikers &&
            hikers.map(hiker => <HikerCard key={hiker.id} hiker={hiker} />)}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
