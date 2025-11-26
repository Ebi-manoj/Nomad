import { useTripleClick } from '@/hooks/useTripleClick';
import { IoIosWarning } from 'react-icons/io';

export interface buttonProps {
  className?: string;
  handleClick?: () => void;
}

export const SosButton = ({ className = '', handleClick }: buttonProps) => {
  const tripleClick = useTripleClick(handleClick ?? (() => {}));
  return (
    <button
      className={`relative group cursor-pointer  ${className}`}
      aria-label="Emergency SOS"
      onClick={tripleClick}
    >
      {/* SOS button */}
      <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110">
        <IoIosWarning className="w-6 h-6 text-white" />
      </div>

      {/* Tooltip */}
      <div
        className="
          pointer-events-none
          absolute right-1/2 top-full mt-2
          -translate-x-2
          px-3 py-1.5 
          bg-black text-white text-xs 
          rounded-md shadow-lg 
          whitespace-nowrap
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-200
          z-50
        "
      >
        Tap 3 times for SOS
      </div>
    </button>
  );
};
