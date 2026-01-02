import React, { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  IndianRupee,
  Calendar,
  Filter,
  Car,
  Footprints,
  CreditCard,
  FileText,
} from 'lucide-react';
import { getAdminRevenueOverview, getAdminRevenueReport } from '@/api/adminRevenue';
import type { RevenueOverviewDTO, DashboardRange } from '@/types/adminRevenue';
import { Pagination } from '@/components/Pagination';
import { StatCard } from './StatCard';
import { generateHTMLReport } from '@/utils/PDFGenerator';

type DateRange = DashboardRange | 'custom';

export const RevenueDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>('monthly');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [overview, setOverview] = useState<RevenueOverviewDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [applyTrigger, setApplyTrigger] = useState(0);
  const [reportLoading, setReportLoading] = useState(false);
  const isDateRangeValid = useMemo(() => {
    if (!fromDate || !toDate) return false;
    return new Date(fromDate) <= new Date(toDate);
  }, [fromDate, toDate]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const apiRange = (
          dateRange === 'custom' ? 'yearly' : dateRange
        ) as DashboardRange;
        const params =
          dateRange === 'custom' && fromDate && toDate
            ? { startDate: fromDate, endDate: toDate, page, limit }
            : { page, limit };
        const res = await getAdminRevenueOverview(apiRange, params);
        if (isMounted && res) setOverview(res);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [dateRange, page, limit, applyTrigger]);

  // reset pagination when range changes
  useEffect(() => {
    setPage(1);
  }, [dateRange]);

  const currentData = overview?.trendData ?? [];
  const currentStats = overview?.summary ?? {
    totalRevenue: 0,
    hikeCommission: 0,
    rideCommission: 0,
    subscriptions: 0,
    growth: 0,
  };
  const transactions = overview?.transactions ?? [];
  const pagination = overview?.pagination ?? {
    page: 1,
    limit,
    total: 0,
    hasNext: false,
    hasPrev: false,
  };
  const subscriptionTrend = overview?.subscriptionTrend ?? [];

  const safePercent = (part: number, total: number) => {
    if (!total || total <= 0) return '0.0';
    const pct = (part / total) * 100;
    return isFinite(pct) ? pct.toFixed(1) : '0.0';
  };

  const pieChartData = [
    {
      name: 'Hike Commission',
      value: currentStats.hikeCommission,
      color: '#10b981',
    },
    {
      name: 'Ride Commission',
      value: currentStats.rideCommission,
      color: '#8b5cf6',
    },
    {
      name: 'Subscriptions',
      value: currentStats.subscriptions,
      color: '#3b82f6',
    },
  ];

  const handleDownloadReport = async () => {
    const dateRangeLabel =
      dateRange === 'custom' && fromDate && toDate
        ? `${fromDate} to ${toDate}`
        : `${dateRange.charAt(0).toUpperCase()}${dateRange.slice(1)}`;

    try {
      setReportLoading(true);
      const apiRange = (dateRange === 'custom' ? 'yearly' : dateRange) as DashboardRange;
      const params =
        dateRange === 'custom' && fromDate && toDate
          ? { startDate: fromDate, endDate: toDate }
          : undefined;
      const data = await getAdminRevenueReport(apiRange, params);
      if (!data) return;

      await generateHTMLReport(
        data.transactions.map(t => ({
          id: t.id,
          date: t.date,
          type: t.type,
          userName: t.userName,
          amount: t.amount,
          status: t.status,
        })),
        {
          totalRevenue: data.summary.totalRevenue,
          hikeCommission: data.summary.hikeCommission,
          rideCommission: data.summary.rideCommission,
          subscriptions: data.summary.subscriptions,
          totalTransactions: data.transactions.length,
          dateRange: dateRangeLabel,
        }
      );
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Revenue Dashboard
          </h1>
          <p className="text-gray-600">
            Track and analyze your platform revenue streams
          </p>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Time Period:</span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setDateRange('today')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  dateRange === 'today'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDateRange('monthly')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  dateRange === 'monthly'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setDateRange('yearly')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  dateRange === 'yearly'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => {
                  setDateRange('custom');
                  setShowCustomDatePicker(true);
                }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  dateRange === 'custom'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Custom Date
              </button>
            </div>
          </div>

          {showCustomDatePicker && dateRange === 'custom' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex gap-4 items-center flex-wrap">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    max={toDate || undefined}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    min={fromDate || undefined}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => {
                    setPage(1);
                    setApplyTrigger(v => v + 1);
                  }}
                  className={`mt-6 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDateRangeValid
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!isDateRangeValid}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${currentStats.totalRevenue.toLocaleString()}`}
            icon={IndianRupee}
            gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            subtitle={`+${currentStats.growth}% growth`}
          />
          <StatCard
            title="Hike Commission"
            value={`₹${currentStats.hikeCommission.toLocaleString()}`}
            icon={Footprints}
            gradient="bg-gradient-to-br from-green-500 to-green-700"
            subtitle={`${safePercent(
              currentStats.hikeCommission,
              currentStats.totalRevenue
            )}% of total`}
          />
          <StatCard
            title="Ride Commission"
            value={`₹${currentStats.rideCommission.toLocaleString()}`}
            icon={Car}
            gradient="bg-gradient-to-br from-purple-500 to-purple-700"
            subtitle={`${safePercent(
              currentStats.rideCommission,
              currentStats.totalRevenue
            )}% of total`}
          />
          <StatCard
            title="Subscriptions"
            value={`₹${currentStats.subscriptions.toLocaleString()}`}
            icon={CreditCard}
            gradient="bg-gradient-to-br from-orange-500 to-orange-700"
            subtitle={`${safePercent(
              currentStats.subscriptions,
              currentStats.totalRevenue
            )}% of total`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Revenue Trend
              </h3>
              <p className="text-sm text-gray-500">Revenue streams over time</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="period"
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
                  formatter={value => {
                    if (typeof value === 'number') {
                      return `₹${value.toLocaleString()}`;
                    }
                    return value;
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hikeCommission"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  name="Hike Commission"
                />
                <Line
                  type="monotone"
                  dataKey="rideCommission"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  name="Ride Commission"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Distribution Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Revenue Distribution
              </h3>
              <p className="text-sm text-gray-500">By revenue source</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={value => {
                    if (typeof value === 'number') {
                      return `₹${value.toLocaleString()}`;
                    }
                    return value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subscription Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Subscription Revenue
            </h3>
            <p className="text-sm text-gray-500">
              Subscription revenue over time
            </p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={subscriptionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
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
                formatter={value => {
                  if (typeof value === 'number') {
                    return `₹${value.toLocaleString()}`;
                  }
                  return value;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="subscriptions"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Subscriptions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Sales Report
                </h3>
                <p className="text-sm text-gray-500">
                  Latest revenue transactions
                </p>
              </div>
              <button
                onClick={handleDownloadReport}
                disabled={reportLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors shadow-lg ${
                  reportLoading ? 'bg-neutral-700 text-white cursor-wait' : 'bg-black text-white hover:bg-neutral-900'
                }`}
              >
                {reportLoading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                {reportLoading ? 'Generating…' : 'PDF'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map(transaction => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {`TXN${transaction.id.slice(0, 8)}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.type === 'Hike Commission'
                            ? 'bg-green-100 text-green-700'
                            : transaction.type === 'Ride Commission'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {transaction.type === 'Hike Commission' && (
                          <Footprints className="w-3 h-3" />
                        )}
                        {transaction.type === 'Ride Commission' && (
                          <Car className="w-3 h-3" />
                        )}
                        {transaction.type === 'Subscription' && (
                          <CreditCard className="w-3 h-3" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {transaction.userName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{transaction.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {(() => {
                  const total = pagination.total || 0;
                  const startIdx =
                    total === 0
                      ? 0
                      : (pagination.page - 1) * pagination.limit + 1;
                  const endIdx = Math.min(
                    pagination.page * pagination.limit,
                    total
                  );
                  return `Showing ${startIdx} to ${endIdx} of ${total} transactions`;
                })()}
              </span>
              <Pagination
                currentPage={page}
                totalPages={Math.max(
                  1,
                  Math.ceil(
                    (pagination.total || 0) / (pagination.limit || limit)
                  )
                )}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
