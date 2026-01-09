import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, RefreshCcw } from 'lucide-react';
import { HikerCard } from './HikerCard';
import type { RideRequestDTO } from '@/types/ride';

interface HikerListProps {
  requests: RideRequestDTO[];
  seatsRemaining: number;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
  isLoading?: boolean;
  handleRefresh: () => void;
  processingId?: string;
  processingAction?: 'accept' | 'decline';
}

export function HikerList({
  requests,
  seatsRemaining,
  onAccept,
  onDecline,
  isLoading = false,
  handleRefresh,
  processingId,
  processingAction,
}: HikerListProps) {
  return (
    <Card className="h-full border border-gray-200 flex flex-col overflow-hidden w-full">
      <CardContent className="p-4 flex flex-col h-full overflow-hidden w-full">
        {/* Header Section - Fixed */}
        <div className="flex-shrink-0 mb-3 w-full">
          <div className="flex justify-between items-center">
            <div className="mb-2">
              <h3 className="font-semibold text-gray-700">
                Seats Remaining: {seatsRemaining}
              </h3>
            </div>
           <div className='flex gap-2 items-center'>
            
             <RefreshCcw
              size={16}
              className="cursor-pointer"
              onClick={handleRefresh}
            />
           </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 text-xs">Available hikers</p>
            {isLoading && (
              <Loader2 size={14} className="animate-spin text-gray-400" />
            )}
          </div>
          <div className="border-b" />
        </div>

        {/* Scrollable List Section */}
        <div className="flex-1 overflow-hidden w-full -mr-4">
          <ScrollArea className="h-full w-full">
            <div className="space-y-3 pr-4">
              {requests && requests.length > 0 ? (
                requests.map(request => (
                  <HikerCard
                    key={request.id}
                    request={request}
                    onAccept={onAccept}
                    onDecline={onDecline}
                    processingId={processingId}
                    processingAction={processingAction}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No join requests at the moment
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
