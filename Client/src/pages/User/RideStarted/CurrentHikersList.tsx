import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { CurrentHikerCard } from './CurrentHikerCard';
import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';
import { Users, MessageCircle } from 'lucide-react';

interface CurrentHikersListProps {
  hikers: GetHikersMatchedResponseDTO[];
  onChatClick: (hiker: GetHikersMatchedResponseDTO) => void;
}

export function CurrentHikersList({
  hikers,
  onChatClick,
}: CurrentHikersListProps) {
  if (hikers.length === 0) {
    return (
      <Card className="h-full border border-gray-200 flex flex-col overflow-hidden">
        <CardContent className="p-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Current Hikers
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Confirmed hikers will appear here once they join your ride.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border border-gray-200 flex flex-col overflow-hidden">
      <CardContent className="p-4 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Matched Hikers
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {hikers.length} Hikers
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            Click chat to message hikers
          </p>
        </div>

        {/* Scrollable Hikers List */}
        <div className="flex-1 overflow-hidden -mr-4">
          <ScrollArea className="h-full w-full">
            <div className="space-y-3 pr-4">
              {hikers.map(hiker => (
                <CurrentHikerCard
                  key={hiker.hikeDetails.hikeId}
                  hiker={hiker}
                  onChatClick={onChatClick}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
