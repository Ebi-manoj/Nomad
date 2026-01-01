import { type LucideIcon } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  trend,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 text-white ${gradient} shadow-lg hover:shadow-xl transition-all hover:scale-105`}
  >
    <div className="absolute top-0 right-0 opacity-10">
      <Icon className="w-32 h-32 transform rotate-12" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" />
        <p className="text-sm font-medium opacity-90">{title}</p>
      </div>
      <h3 className="text-4xl font-bold mb-1">{value}</h3>
      <div className="flex items-center gap-2">
        <p className="text-sm opacity-80">{subtitle}</p>
        {trend && (
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);
