// src/components/ui/Skeleton.tsx
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-100 rounded animate-pulse ${className}`}
    ></div>
  );
};
