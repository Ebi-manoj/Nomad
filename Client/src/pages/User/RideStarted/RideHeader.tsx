import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RideHeaderProps {
  pickup: string;
  destination: string;
  onClose: () => void;
}

export function RideHeader({ pickup, destination, onClose }: RideHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <span className="block w-1.5 h-6 bg-black rounded-full"></span>
        <h2 className="truncate font-bold text-xl text-gray-900 tracking-tight">
          {pickup && pickup.split(',')[0]} →{' '}
          {pickup && destination.split(',')[0]}
        </h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 rounded-full cursor-pointer"
        onClick={onClose}
      >
        <X size={18} />
      </Button>
    </div>
  );
}
