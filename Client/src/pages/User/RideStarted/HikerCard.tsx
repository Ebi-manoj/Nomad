import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface Hiker {
  id: number;
  name: string;
  pickup: string;
  destination: string;
  cost: string;
  rating: number;
}

interface HikerCardProps {
  hiker: Hiker;
}

export function HikerCard({ hiker }: HikerCardProps) {
  return (
    <Card className="border border-gray-300 shadow-sm hover:shadow-lg transition rounded-xl bg-gray-50 mb-2">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
            👤
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">{hiker.name}</h4>
            <p className="text-xs text-gray-500">
              Pickup: {hiker.pickup} → {hiker.destination}
            </p>
            <p className="text-xs text-gray-500">
              Cost: {hiker.cost} | ⭐{hiker.rating}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Check className="text-green-500" size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <X className="text-red-500" size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
