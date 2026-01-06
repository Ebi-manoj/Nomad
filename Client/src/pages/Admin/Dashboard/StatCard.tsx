import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';

type Trend = 'up' | 'down';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: Trend;
  subtitle?: string;
  icon: LucideIcon;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  subtitle,
  icon: Icon,
}) => {
  const isUsers = title.includes('Users');
  const isRides = title.includes('Rides');
  const isHikes = title.includes('Hikes');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}

          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-500">vs previous </span>
          </div>
        </div>

        <div
          className={`p-3 rounded-lg ${
            isUsers
              ? 'bg-blue-50'
              : isRides
              ? 'bg-purple-50'
              : isHikes
              ? 'bg-green-50'
              : 'bg-orange-50'
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              isUsers
                ? 'text-blue-600'
                : isRides
                ? 'text-purple-600'
                : isHikes
                ? 'text-green-600'
                : 'text-orange-600'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
