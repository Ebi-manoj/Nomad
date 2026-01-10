import { useTripleClick } from '@/hooks/useTripleClick';
import { IoIosWarning } from 'react-icons/io';
import { motion } from 'framer-motion';

export interface buttonProps {
  className?: string;
  handleClick?: () => void;
}

export const SosButton = ({ className = '', handleClick }: buttonProps) => {
  const tripleClick = useTripleClick(handleClick ?? (() => {}));

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className={`fixed z-[9999] cursor-grab touch-none ${className}`}
        initial={{ y: 0 }} // Default position managed by parent or fixed class
        style={{ touchAction: 'none' }} // Crucial for mobile drag
      >
        <button
          className="relative group"
          aria-label="Emergency SOS"
          onClick={tripleClick}
        >
          {/* Pulsing Effect */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          
          {/* Main Button */}
          <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-600 via-red-500 to-rose-600 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] border-2 border-red-400/50 backdrop-blur-sm">
            <IoIosWarning className="w-7 h-7 text-white drop-shadow-md" />
          </div>

          {/* Tooltip */}
          <div
            className="
              pointer-events-none
              absolute right-1/2 top-full mt-1
              -translate-x-1/2
              px-2 py-1 
              bg-slate-900/90 text-white text-[9px] font-bold uppercase tracking-wide
              rounded-md shadow-lg border border-slate-700
              whitespace-nowrap
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-200
              backdrop-blur-md
            "
          >
            Tap 3 times for SOS
          </div>
        </button>
      </motion.div>
    </>
  );
};
