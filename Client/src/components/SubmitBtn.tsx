import { Loader } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils'; // if you use a cn() helper (like in shadcn)

interface SubmitBtnProps {
  text: string;
  isLoading: boolean;
  className?: string; // 👈 optional className
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
        // ✅ default styles
        'mt-2 w-full cursor-pointer bg-black text-white font-semibold py-2.5 rounded-md transition duration-200 disabled:opacity-80 disabled:cursor-not-allowed hover:bg-gray-800',
        className // 👈 override or add styles if provided
      )}
    >
      {isLoading ? <Loader className="mx-auto animate-spin" /> : text}
    </button>
  );
};
