import { List,  X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToggleRightPanelButtonProps {
  showRightPanel: boolean;
  setShowRightPanel: (show: boolean) => void;
  requestCount: number;
}

export function ToggleRightPanelButton({
  showRightPanel,
  setShowRightPanel,
  requestCount,
}: ToggleRightPanelButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowRightPanel(!showRightPanel)}
      className={`fixed top-28 right-0 z-50 p-2.5 rounded-l-xl shadow-lg border-y border-l border-slate-200 transition-all duration-300 md:hidden ${
        showRightPanel
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-900'
      }`}
    >
      <div className="flex items-center gap-2">
        {showRightPanel ? (
          <X size={20} />
        ) : (
          <div className="relative">
            <List size={20} />
            {requestCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {requestCount}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}
