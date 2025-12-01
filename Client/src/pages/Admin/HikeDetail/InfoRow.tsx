import React from 'react';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const InfoRow = ({ label, value, className = '' }: InfoRowProps) => (
  <div
    className={`flex items-center justify-between py-2 border-b border-dashed border-zinc-200 dark:border-zinc-800 last:border-0 ${className}`}
  >
    <span className="text-sm text-zinc-500">{label}</span>
    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
      {value}
    </span>
  </div>
);
