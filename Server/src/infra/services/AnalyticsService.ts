import { HikeLogModel } from '../database/hikelog.model';
import { RideLogModel } from '../database/ridelog.mode';
import { UserModel } from '../database/user.model';
import { RideBookingModel } from '../database/RideBooking.model';
import { ReviewModel } from '../database/review.model';
import { SosLogModel } from '../database/sosLog.model';
import {
  DashboardRange,
  MonthlyTrendPointDTO,
  QuickStatsDTO,
  StatSummaryDTO,
  StatusBreakdownDTO,
  TopPerformerDTO,
} from '../../domain/dto/adminDashboardDTO';
import { IAnalyticsService } from '../../application/services/IAnalyticsService';

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}
function startOfYear(d: Date) {
  return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}
function endOfYear(d: Date) {
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

function getRangeDates(range: DashboardRange) {
  const now = new Date();
  if (range === 'today') {
    const start = startOfDay(now);
    const end = endOfDay(now);
    const prev = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const prevStart = startOfDay(prev);
    const prevEnd = endOfDay(prev);
    return { start, end, prevStart, prevEnd, bucket: 'hour' as const };
  }
  if (range === 'monthly') {
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 15);
    const prevStart = startOfMonth(prev);
    const prevEnd = endOfMonth(prev);
    return { start, end, prevStart, prevEnd, bucket: 'day' as const };
  }
  // yearly
  const start = startOfYear(now);
  const end = endOfYear(now);
  const prev = new Date(now.getFullYear() - 1, 6, 1);
  const prevStart = startOfYear(prev);
  const prevEnd = endOfYear(prev);
  return { start, end, prevStart, prevEnd, bucket: 'month' as const };
}

function computeChange(current: number, previous: number) {
  if (previous === 0)
    return {
      changePercent: current > 0 ? 100 : 0,
      trend: current > 0 ? ('up' as const) : ('down' as const),
    };
  const diff = current - previous;
  const pct = (diff / previous) * 100;
  return {
    changePercent: Number(pct.toFixed(1)),
    trend: diff >= 0 ? ('up' as const) : ('down' as const),
  };
}

export class AnalyticsService implements IAnalyticsService {
  async getUserStats(range: DashboardRange): Promise<StatSummaryDTO> {
    const { start, end, prevStart, prevEnd } = getRangeDates(range);
    const [current, previous] = await Promise.all([
      UserModel.countDocuments({
        role: { $ne: 'admin' },
        createdAt: { $gte: start, $lte: end },
      }),
      UserModel.countDocuments({
        role: { $ne: 'admin' },
        createdAt: { $gte: prevStart, $lte: prevEnd },
      }),
    ]);
    const change = computeChange(current, previous);
    return {
      total: current,
      changePercent: change.changePercent,
      trend: change.trend,
    };
  }

  async getRideStats(range: DashboardRange): Promise<StatSummaryDTO> {
    const { start, end, prevStart, prevEnd } = getRangeDates(range);
    const [current, previous] = await Promise.all([
      RideLogModel.countDocuments({ createdAt: { $gte: start, $lte: end } }),
      RideLogModel.countDocuments({
        createdAt: { $gte: prevStart, $lte: prevEnd },
      }),
    ]);
    const change = computeChange(current, previous);
    return {
      total: current,
      changePercent: change.changePercent,
      trend: change.trend,
    };
  }

  async getHikeStats(range: DashboardRange): Promise<StatSummaryDTO> {
    const { start, end, prevStart, prevEnd } = getRangeDates(range);
    const [current, previous] = await Promise.all([
      HikeLogModel.countDocuments({ createdAt: { $gte: start, $lte: end } }),
      HikeLogModel.countDocuments({
        createdAt: { $gte: prevStart, $lte: prevEnd },
      }),
    ]);
    const change = computeChange(current, previous);
    return {
      total: current,
      changePercent: change.changePercent,
      trend: change.trend,
    };
  }

  async getSosStats(range: DashboardRange): Promise<StatSummaryDTO> {
    const { start, end, prevStart, prevEnd } = getRangeDates(range);
    const [current, previous] = await Promise.all([
      SosLogModel.countDocuments({ createdAt: { $gte: start, $lte: end } }),
      SosLogModel.countDocuments({
        createdAt: { $gte: prevStart, $lte: prevEnd },
      }),
    ]);
    const change = computeChange(current, previous);
    return {
      total: current,
      changePercent: change.changePercent,
      trend: change.trend,
    };
  }

  async getMonthlyTrends(
    range: DashboardRange
  ): Promise<MonthlyTrendPointDTO[]> {
    const { start, end, bucket } = getRangeDates(range);

    // Helper to build all buckets
    const labels: string[] = [];
    if (bucket === 'month') {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      for (let m = 0; m < 12; m++) labels.push(monthNames[m]);
    } else if (bucket === 'day') {
      const daysInMonth = end.getDate();
      for (let d = 1; d <= daysInMonth; d++) labels.push(String(d));
    } else {
      for (let h = 0; h < 24; h++) labels.push(h.toString().padStart(2, '0'));
    }

    const groupId =
      bucket === 'month'
        ? { $month: '$createdAt' }
        : bucket === 'day'
        ? { $dayOfMonth: '$createdAt' }
        : { $hour: '$createdAt' };

    const [rideAgg, hikeAgg] = await Promise.all([
      RideLogModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: groupId, count: { $sum: 1 } } },
      ]),
      HikeLogModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: groupId, count: { $sum: 1 } } },
      ]),
    ]);

    const rideMap = new Map<number, number>();
    const hikeMap = new Map<number, number>();
    for (const r of rideAgg) rideMap.set(r._id, r.count);
    for (const h of hikeAgg) hikeMap.set(h._id, h.count);

    const points: MonthlyTrendPointDTO[] = labels.map((label, idx) => {
      const key =
        bucket === 'month' ? idx + 1 : bucket === 'day' ? idx + 1 : idx;
      return {
        label,
        rides: rideMap.get(key) || 0,
        hikes: hikeMap.get(key) || 0,
      };
    });

    return points;
  }

  async getStatusBreakdown(range: DashboardRange): Promise<StatusBreakdownDTO> {
    const { start, end } = getRangeDates(range);
    const agg = await RideLogModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const res: StatusBreakdownDTO = { active: 0, cancelled: 0, completed: 0 };
    for (const r of agg) {
      if (r._id === 'active') res.active = r.count;
      else if (r._id === 'completed') res.completed = r.count;
      else if (r._id === 'cancelled') res.cancelled = r.count;
    }
    return res;
  }

  async getTopPerformers(
    range: DashboardRange
  ): Promise<{ riders: TopPerformerDTO[]; hikers: TopPerformerDTO[] }> {
    const { start, end } = getRangeDates(range);

    const ridersAgg = await RideLogModel.aggregate([
      {
        $match: { createdAt: { $gte: start, $lte: end }, status: 'completed' },
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 },
          amount: { $sum: { $ifNull: ['$totalEarning', 0] } },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          id: { $toString: '$_id' },
          name: '$user.fullName',
          count: 1,
          amount: 1,
          rating: '$user.rating',
        },
      },
    ]);

    const hikersAgg = await RideBookingModel.aggregate([
      {
        $match: { createdAt: { $gte: start, $lte: end }, status: 'COMPLETED' },
      },
      {
        $group: {
          _id: '$hikerId',
          count: { $sum: 1 },
          amount: { $sum: { $ifNull: ['$amount', 0] } },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          id: { $toString: '$_id' },
          name: '$user.fullName',
          count: 1,
          amount: 1,
          rating: '$user.rating',
        },
      },
    ]);

    return {
      riders: ridersAgg as TopPerformerDTO[],
      hikers: hikersAgg as TopPerformerDTO[],
    };
  }

  async getQuickStats(range: DashboardRange): Promise<QuickStatsDTO> {
    const { start, end } = getRangeDates(range);

    const [
      totalRides,
      completedRides,
      cancelledRides,
      avgRatingAgg,
      revenueAgg,
    ] = await Promise.all([
      RideLogModel.countDocuments({ createdAt: { $gte: start, $lte: end } }),
      RideLogModel.countDocuments({
        createdAt: { $gte: start, $lte: end },
        status: 'completed',
      }),
      RideLogModel.countDocuments({
        createdAt: { $gte: start, $lte: end },
        status: 'cancelled',
      }),
      ReviewModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } },
      ]),
      RideBookingModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        {
          $group: {
            _id: null,
            revenue: { $sum: { $ifNull: ['$platformFee', 0] } },
          },
        },
      ]),
    ]);

    const completionRate =
      totalRides > 0
        ? Number(((completedRides / totalRides) * 100).toFixed(1))
        : 0;
    const cancelRate =
      totalRides > 0
        ? Number(((cancelledRides / totalRides) * 100).toFixed(1))
        : 0;
    const avgRating = avgRatingAgg.length
      ? Number((avgRatingAgg[0].avgRating || 0).toFixed(1))
      : 0;
    const platformRevenue = revenueAgg.length ? revenueAgg[0].revenue || 0 : 0;

    return { completionRate, avgRating, cancelRate, platformRevenue };
  }
}
