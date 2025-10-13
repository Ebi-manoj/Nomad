import { useState } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
}) => {
  const [loading, setLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-3xl w-full bg-white rounded-lg p-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg z-10 cursor-pointer"
          onClick={() => {
            setLoading(true);
            onClose();
          }}
        >
          ✕
        </button>

        {loading && (
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt={'preview'}
            className={`w-full h-auto max-h-[80vh] object-contain rounded-md ${
              loading ? 'hidden' : 'block'
            }`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        )}
      </div>
    </div>
  );
};
