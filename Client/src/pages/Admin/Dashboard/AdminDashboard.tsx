import { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  Car,
  Footprints,
  AlertTriangle,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  IndianRupee,
  LogOut,
} from 'lucide-react';
import { getAdminDashboardOverview } from '@/api/adminDashboard';
import type {
  DashboardOverviewDTO,
  DashboardRange,
} from '@/types/adminDashboard';
import { StatCard } from './StatCard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/features/auth/auth.thunks';

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const AdminDashboard = () => {
  const [range, setRange] = useState<DashboardRange>('yearly');
  const [overview, setOverview] = useState<DashboardOverviewDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/auth/sign-in', { replace: true });
    } catch (_) {
      
    }
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await getAdminDashboardOverview(range);
        if (data) setOverview(data);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [range]);

  const statusData = useMemo(() => {
    if (!overview)
      return [] as { name: string; value: number; color: string }[];
    return [
      {
        name: 'Completed',
        value: overview.statusBreakdown.completed,
        color: '#10b981',
      },
      {
        name: 'Cancelled',
        value: overview.statusBreakdown.cancelled,
        color: '#ef4444',
      },
      {
        name: 'Active',
        value: overview.statusBreakdown.active,
        color: '#3b82f6',
      },
    ];
  }, [overview]);

  const formatChange = (n: number) => `${n >= 0 ? '+' : ''}${n}%`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Monitor your platform's performance and key metrics
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex cursor-pointer border border-red-500 bg-white items-center gap-2 px-4 py-2 rounded-lg  text-gray-700 hover:text-gray-500 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={
              overview ? overview.stats.users.total.toLocaleString() : '--'
            }
            change={
              overview
                ? formatChange(overview.stats.users.changePercent)
                : '+0%'
            }
            trend={overview ? overview.stats.users.trend : 'up'}
            subtitle={overview?.stats.users.subtitle}
            icon={Users}
          />
          <StatCard
            title="Total Rides"
            value={
              overview ? overview.stats.rides.total.toLocaleString() : '--'
            }
            change={
              overview
                ? formatChange(overview.stats.rides.changePercent)
                : '+0%'
            }
            trend={overview ? overview.stats.rides.trend : 'up'}
            subtitle={overview?.stats.rides.subtitle}
            icon={Car}
          />
          <StatCard
            title="Total Hikes"
            value={
              overview ? overview.stats.hikes.total.toLocaleString() : '--'
            }
            change={
              overview
                ? formatChange(overview.stats.hikes.changePercent)
                : '+0%'
            }
            trend={overview ? overview.stats.hikes.trend : 'up'}
            subtitle={overview?.stats.hikes.subtitle}
            icon={Footprints}
          />
          <StatCard
            title="SOS Alerts"
            value={
              overview ? overview.stats.sosAlerts.total.toLocaleString() : '--'
            }
            change={
              overview
                ? formatChange(overview.stats.sosAlerts.changePercent)
                : '+0%'
            }
            trend={overview ? overview.stats.sosAlerts.trend : 'down'}
            subtitle={overview?.stats.sosAlerts.subtitle}
            icon={AlertTriangle}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Rides & Hikes Overview
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Performance comparison
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setRange('today')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    range === 'today'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setRange('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    range === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setRange('yearly')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    range === 'yearly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={overview?.monthlyData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="label"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rides"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Rides"
                />
                <Line
                  type="monotone"
                  dataKey="hikes"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Hikes"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ride Status Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ride Status
            </h3>
            <p className="text-sm text-gray-500 mb-6">This period breakdown</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers & SOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Riders */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Riders
              </h3>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer font-medium">
                View all
              </span>
            </div>
            <div className="space-y-4">
              {overview?.topRiders.map((rider, index) => (
                <div
                  key={rider.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-bold text-gray-400 w-6">
                    {index + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-purple-600">
                      {initials(rider.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {rider.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {rider.count} rides
                      </span>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium text-gray-600">
                          {rider.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    ₹{rider.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hikers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Hikers
              </h3>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer font-medium">
                View all
              </span>
            </div>
            <div className="space-y-4">
              {overview?.topHikers.map((hiker, index) => (
                <div
                  key={hiker.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-bold text-gray-400 w-6">
                    {index + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-green-600">
                      {initials(hiker.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {hiker.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {hiker.count} hikes
                      </span>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium text-gray-600">
                          {hiker.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    ₹{hiker.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent SOS Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent SOS Alerts
              </h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                {overview?.recentSOS.filter(s => s.status === 'active')
                  .length || 0}{' '}
                Active
              </span>
            </div>
            <div className="space-y-4">
              {overview?.recentSOS.map(sos => (
                <div
                  key={sos.id}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {sos.userName}
                        </p>
                        <p className="text-xs text-gray-500">{sos.role}</p>
                      </div>
                    </div>
                    {sos.status === 'active' ? (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Resolved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                    📍{' '}
                    {sos.location
                      ? `${sos.location.lat.toFixed(
                          4
                        )}, ${sos.location.lng.toFixed(4)}`
                      : 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(sos.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              View All Alerts
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Completion Rate</p>
                <p className="text-lg font-bold text-gray-900">
                  {overview ? `${overview.quickStats.completionRate}%` : '--'}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg Rating</p>
                <p className="text-lg font-bold text-gray-900">
                  {overview ? overview.quickStats.avgRating : '--'}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <IndianRupee className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Platform Revenue</p>
                <p className="text-lg font-bold text-gray-900">
                  {overview
                    ? `₹${overview.quickStats.platformRevenue.toLocaleString()}`
                    : '--'}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Cancel Rate</p>
                <p className="text-lg font-bold text-gray-900">
                  {overview ? `${overview.quickStats.cancelRate}%` : '--'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
