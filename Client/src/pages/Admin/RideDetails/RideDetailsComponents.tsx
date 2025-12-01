import React from 'react';

export const InfoItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ElementType;
}) => (
  <div className="pb-4 border-b border-gray-100 dark:border-zinc-800 last:border-0 last:pb-0">
    <div className="flex items-center gap-3 mb-2">
      {Icon && (
        <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
    <p className="text-base font-semibold text-gray-900 dark:text-white ml-11">
      {value}
    </p>
  </div>
);

export const MetricCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) => (
  <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between h-24">
    <div className="flex items-center justify-between mb-1">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </p>
      <Icon className="w-5 h-5 text-blue-500" />
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);
