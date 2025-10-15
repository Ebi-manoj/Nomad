import { Loader } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface SubmitBtnProps {
  text: string;
  isLoading: boolean;
  className?: string;
}

export const SubmitBtn: React.FC<SubmitBtnProps> = ({
  text,
  isLoading,
  className,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={cn(
        'mt-2 w-full cursor-pointer bg-black text-white font-semibold py-2.5 rounded-md transition duration-200 disabled:opacity-80 disabled:cursor-not-allowed hover:bg-gray-800',
        className
      )}
    >
      {isLoading ? <Loader className="mx-auto animate-spin" /> : text}
    </button>
  );
};
