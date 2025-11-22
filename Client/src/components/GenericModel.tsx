import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  primaryAction?: {
    label: string;
    className?: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const GenericModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryAction,
  secondaryAction,
}: GenericModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-md w-[90%] sm:w-[420px] p-5 shadow-xl relative max-h-[85vh]"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: 'spring', duration: 0.4 }}
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={22} />
            </button>

            {/* Title */}
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}

            {/* Body Content */}
            <div className="mt-4">{children}</div>

            {/* CTA Buttons */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.loading}
                  className={`cursor-pointer w-full py-2.5 bg-blue-600 hover:bg-blue-700 transition text-white font-medium rounded-lg ${primaryAction.className}`}
                >
                  {primaryAction.loading
                    ? 'Please wait...'
                    : primaryAction.label}
                </button>
              )}

              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className="cursor-pointer w-full py-2.5 bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium rounded-lg"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
