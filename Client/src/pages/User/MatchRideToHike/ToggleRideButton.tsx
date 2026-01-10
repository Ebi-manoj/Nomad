import { Car, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToggleRideButtonProps {
  showRideList: boolean;
  setShowRideList: (show: boolean) => void;
  availableCount: number;
}

export function ToggleRideButton({
  showRideList,
  setShowRideList,
  availableCount,
}: ToggleRideButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowRideList(!showRideList)}
      className={`fixed top-28 right-0 z-50 p-2.5 rounded-l-xl shadow-lg border-y border-l border-slate-200 transition-all duration-300 md:hidden ${
        showRideList
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-900'
      }`}
    >
      <div className="flex items-center gap-2">
        {showRideList ? (
          <X size={20} />
        ) : (
          <div className="relative">
            <Car size={20} />
            {availableCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {availableCount}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}
