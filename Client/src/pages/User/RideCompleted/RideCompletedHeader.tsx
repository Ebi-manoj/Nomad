import { Check, Sparkles } from 'lucide-react';

interface RideCompletedHeaderProps {
  totalCostShared: number;
}

export const RideCompletedHeader = ({
  totalCostShared,
}: RideCompletedHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="text-center mb-8 px-2">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
          Ride <span className="text-blue-600">delivered</span>
          <span className="ml-2">🚗</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Excellent work! You've earned{' '}
          <span className="font-bold text-green-600">₹{totalCostShared}</span>
        </p>
        <p className="text-muted-foreground text-xs md:text-sm mt-1">
          Thanks for being a reliable Nomad driver
        </p>
      </div>
    </>
  );
};
