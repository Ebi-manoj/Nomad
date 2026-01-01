import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import {
  Car,
  Footprints,
  TrendingUp,
  MapPin,
  Coins,
  Leaf,
  Award,
  Star,
  Target,
  Sparkles,
} from 'lucide-react';
import { getUserDashboardOverview } from '@/api/userDashboard';
import type { UserDashboardDTO } from '@/types/userDashboard';
import { StatCard } from './StatsCard';

export const UserDashboard = () => {
  const [data, setData] = useState<UserDashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserDashboardOverview();
      if (result) setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-2">
            Unable to load your dashboard
          </p>
          <p className="text-gray-500 text-sm">Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Insights & Performance Overview
          </h1>
          <p className="text-gray-600 text-lg">
            Explore key metrics and trends to understand how your rides are
            performing.
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Rides Given"
            value={data.stats.totalRides.count}
            subtitle="As a rider"
            icon={Car}
            gradient="bg-gradient-to-br from-purple-500 to-purple-700"
            trend={data.stats.totalRides.trend}
          />
          <StatCard
            title="Total Hikes Taken"
            value={data.stats.totalHikes.count}
            subtitle="As a hiker"
            icon={Footprints}
            gradient="bg-gradient-to-br from-green-500 to-green-700"
            trend={data.stats.totalHikes.trend}
          />
          <StatCard
            title="Distance Traveled"
            value={`${data.stats.totalKm.distance} km`}
            subtitle="Total distance"
            icon={MapPin}
            gradient="bg-gradient-to-br from-blue-500 to-blue-700"
            trend={data.stats.totalKm.trend}
          />
          <StatCard
            title="Safety Score"
            value={data.stats.safetyScore.score}
            subtitle={`${data.stats.safetyScore.rating} ⭐ rating`}
            icon={Award}
            gradient="bg-gradient-to-br from-orange-500 to-orange-700"
            trend="Excellent"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Activity Overview
              </h3>
              <p className="text-sm text-gray-500">
                Your rides and hikes over time
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rides"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Rides Given"
                />
                <Line
                  type="monotone"
                  dataKey="hikes"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Hikes Taken"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Earnings Trend
              </h3>
              <p className="text-sm text-gray-500">Money earned from rides</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.earnings}>
                <defs>
                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={value => [`₹${value}`, 'Earnings']}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#earningsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Spending Pattern
              </h3>
              <p className="text-sm text-gray-500">Money spent on hikes</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.spending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={value => [`₹${value}`, 'Spent']}
                />
                <Bar dataKey="spent" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Comparison */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Cost Comparison
              </h3>
              <p className="text-sm text-gray-500">
                Your savings vs alternatives
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Carpool (You)
                    </p>
                    <p className="text-xs text-gray-500">Smart choice!</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ₹{data.costComparison.carpool.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Private Vehicle
                    </p>
                    <p className="text-xs text-gray-500">Fuel + Maintenance</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-700">
                  ₹{data.costComparison.privateVehicle.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Taxi/Uber
                    </p>
                    <p className="text-xs text-gray-500">Most expensive</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-700">
                  ₹{data.costComparison.taxi.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    <span className="font-semibold">Total Savings</span>
                  </div>
                  <span className="text-2xl font-bold">
                    ₹{data.costComparison.savings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Routes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Top Routes
              </h3>
              <p className="text-sm text-gray-500">Your most frequent trips</p>
            </div>
            <div className="space-y-4">
              {data.topRoutes.map((route, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-semibold text-gray-900">
                          {route.from}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <p className="text-sm font-semibold text-gray-900">
                          {route.to}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      {route.count}x
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{route.km} km</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-500">Your latest trips</p>
            </div>
            <div className="space-y-4">
              {data.recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          activity.type === 'ride'
                            ? 'bg-purple-100'
                            : 'bg-green-100'
                        }`}
                      >
                        {activity.type === 'ride' ? (
                          <Car
                            className={`w-5 h-5 ${
                              activity.type === 'ride'
                                ? 'text-purple-600'
                                : 'text-green-600'
                            }`}
                          />
                        ) : (
                          <Footprints className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">
                          {activity.date}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {activity.from} → {activity.to}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.km} km
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {activity.rating}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      ₹{activity.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact & Achievements */}
          <div className="space-y-6">
            {/* Environmental Impact */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6" />
                <h3 className="text-xl font-bold">Environmental Impact</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <span className="text-sm">CO₂ Saved</span>
                  <span className="text-lg font-bold">
                    {data.environmental.co2Saved} kg
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <span className="text-sm">Trees Equivalent</span>
                  <span className="text-lg font-bold">
                    {data.environmental.treesEquivalent} 🌳
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <span className="text-sm">Fuel Saved</span>
                  <span className="text-lg font-bold">
                    {data.environmental.fuelSaved}L
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Achievements
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {data.achievements.length ? (
                  data.achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-xl text-center transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200'
                          : 'bg-gray-50 border border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <p className="text-xs font-bold text-gray-900 mb-1">
                        {achievement.title}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12 px-4">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                        <Award className="w-10 h-10 text-yellow-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      Badges Coming Soon! 🎉
                    </h3>

                    <p className="text-sm text-gray-600 text-center max-w-xs mb-4">
                      Complete rides and unlock amazing achievements. Your badge
                      collection starts soon!
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                      <span className="font-medium">In Development</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Earnings</p>
                <h2 className="text-4xl font-bold">
                  ₹{data.stats.totalEarnings.amount.toLocaleString()}
                </h2>
              </div>
            </div>
            <p className="text-sm opacity-80">
              From {data.stats.totalRides.count} rides given
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Spent</p>
                <h2 className="text-4xl font-bold">
                  ₹{data.stats.totalSpent.amount.toLocaleString()}
                </h2>
              </div>
            </div>
            <p className="text-sm opacity-80">
              From {data.stats.totalHikes.count} hikes taken
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
