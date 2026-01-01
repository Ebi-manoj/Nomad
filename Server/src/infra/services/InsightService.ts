import { RideLogModel } from '../database/ridelog.mode';
import { RideBookingModel } from '../database/RideBooking.model';
import { ReviewModel } from '../database/review.model';
import type {
  CostComparisonDTO,
  EnvironmentalDTO,
  MonthlyActivityPointDTO,
  MonthlyEarningPointDTO,
  MonthlySpendingPointDTO,
  RecentActivityDTO,
  TopRouteDTO,
  UserDashboardDTO,
  UserStatsDTO,
} from '../../domain/dto/userDashboardDTO';
import { IInsightService } from '../../application/services/IInsightService';
import { RideStatus } from '../../domain/enums/Ride';
import { RideBookingStatus } from '../../domain/enums/RideBooking';
import mongoose from 'mongoose';

function monthLabel(monthIdx: number) {
  const labels = [
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
  return labels[monthIdx];
}

function humanizeSince(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hours ago`;
  const days = Math.floor(hr / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return `${years} years ago`;
}

function pctTrend(
  current: number,
  prev: number
): `+${number}%` | `-${number}%` {
  if (prev <= 0) return current >= prev ? '+100%' : '-0%';
  const pct = Math.round(((current - prev) / prev) * 100);
  return (pct >= 0 ? `+${pct}%` : `${pct}%`) as `+${number}%` | `-${number}%`;
}

export class InsightService implements IInsightService {
  async getStats(userId: string): Promise<UserStatsDTO> {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Current month and previous month ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    const [
      ridesCurrent,
      ridesPrev,
      hikesCurrent,
      hikesPrev,
      kmRides,
      kmHikes,
      spentCurrent,
      spentPrev,
      earningsCurrent,
      earningsPrev,
      avgRatingAgg,
      overallRides,
      overallHikes,
    ] = await Promise.all([
      RideLogModel.countDocuments({
        userId: userObjectId,
        status: RideStatus.COMPLETED,
        createdAt: { $gte: startOfMonth },
      }),
      RideLogModel.countDocuments({
        userId: userObjectId,
        status: RideStatus.COMPLETED,
        createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
      }),
      RideBookingModel.countDocuments({
        hikerId: userObjectId,
        status: RideBookingStatus.COMPLETED,
        createdAt: { $gte: startOfMonth },
      }),
      RideBookingModel.countDocuments({
        hikerId: userObjectId,
        status: RideBookingStatus.COMPLETED,
        createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
      }),
      RideLogModel.aggregate([
        { $match: { userId: userObjectId } },
        {
          $group: {
            _id: null,
            total: { $sum: { $ifNull: ['$totalDistance', 0] } },
          },
        },
      ]),
      RideBookingModel.aggregate([
        { $match: { hikerId: userObjectId } },
        {
          $group: {
            _id: null,
            total: { $sum: { $ifNull: ['$totalDistance', 0] } },
          },
        },
      ]),
      RideBookingModel.aggregate([
        {
          $match: { hikerId: userObjectId },
        },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$amount', 0] } } } },
      ]),
      RideBookingModel.aggregate([
        {
          $match: {
            hikerId: userObjectId,
          },
        },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$amount', 0] } } } },
      ]),
      RideLogModel.aggregate([
        { $match: { userId: userObjectId } },
        {
          $group: {
            _id: null,
            total: { $sum: { $ifNull: ['$totalEarning', 0] } },
          },
        },
      ]),
      RideLogModel.aggregate([
        {
          $match: {
            userId: userObjectId,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: { $ifNull: ['$totalEarning', 0] } },
          },
        },
      ]),
      ReviewModel.aggregate([
        { $match: { reviewedUserId: userObjectId } },
        { $group: { _id: null, avg: { $avg: '$rating' } } },
      ]),
      RideLogModel.countDocuments({ userId, status: RideStatus.COMPLETED }),
      RideBookingModel.countDocuments({
        hikerId: userId,
      }),
    ]);

    const totalKm = (kmRides[0]?.total || 0) + (kmHikes[0]?.total || 0);
    const spentCur = spentCurrent[0]?.total || 0;
    const spentPr = spentPrev[0]?.total || 0;
    const earnCur = earningsCurrent[0]?.total || 0;
    const earnPr = earningsPrev[0]?.total || 0;
    const avgRating = avgRatingAgg[0]?.avg
      ? Number(avgRatingAgg[0].avg.toFixed(1))
      : 0;

    return {
      totalRides: {
        count: overallRides,
        trend: pctTrend(ridesCurrent, ridesPrev),
      },
      totalHikes: {
        count: overallHikes,
        trend: pctTrend(hikesCurrent, hikesPrev),
      },
      totalKm: { distance: Math.round(totalKm), trend: pctTrend(totalKm, 0) },
      totalSpent: {
        amount: Math.round(spentCur),
        trend: pctTrend(spentCur, spentPr),
      },
      totalEarnings: {
        amount: Math.round(earnCur),
        trend: pctTrend(earnCur, earnPr),
      },
      safetyScore: {
        score: Math.round((avgRating / 5) * 100),
        rating: avgRating,
      },
    };
  }

  async getMonthlyActivity(userId: string): Promise<MonthlyActivityPointDTO[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const start = new Date();
    start.setMonth(start.getMonth() - 9, 1);
    start.setHours(0, 0, 0, 0);

    const [rides, hikes] = await Promise.all([
      RideLogModel.aggregate([
        { $match: { userId: userObjectId, createdAt: { $gte: start } } },
        {
          $group: {
            _id: { m: { $month: '$createdAt' }, y: { $year: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
      ]),
      RideBookingModel.aggregate([
        { $match: { hikerId: userObjectId, createdAt: { $gte: start } } },
        {
          $group: {
            _id: { m: { $month: '$createdAt' }, y: { $year: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const mapR = new Map<string, number>();
    const mapH = new Map<string, number>();

    for (const r of rides) mapR.set(`${r._id.y}-${r._id.m}`, r.count);
    for (const h of hikes) mapH.set(`${h._id.y}-${h._id.m}`, h.count);

    const points: MonthlyActivityPointDTO[] = [];
    const current = new Date();
    for (let i = 9; i >= 0; i--) {
      const d = new Date(current.getFullYear(), current.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      points.push({
        month: monthLabel(d.getMonth()),
        rides: mapR.get(key) || 0,
        hikes: mapH.get(key) || 0,
      });
    }
    return points;
  }

  async getMonthlyEarnings(userId: string): Promise<MonthlyEarningPointDTO[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const start = new Date();
    start.setMonth(start.getMonth() - 9, 1);
    start.setHours(0, 0, 0, 0);

    const agg = await RideLogModel.aggregate([
      { $match: { userId: userObjectId, createdAt: { $gte: start } } },
      {
        $group: {
          _id: { m: { $month: '$createdAt' }, y: { $year: '$createdAt' } },
          total: { $sum: { $ifNull: ['$totalEarning', 0] } },
        },
      },
    ]);

    const map = new Map<string, number>();
    for (const a of agg) map.set(`${a._id.y}-${a._id.m}`, a.total);

    const points: MonthlyEarningPointDTO[] = [];
    const current = new Date();
    for (let i = 9; i >= 0; i--) {
      const d = new Date(current.getFullYear(), current.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      points.push({
        month: monthLabel(d.getMonth()),
        earnings: map.get(key) || 0,
      });
    }
    return points;
  }

  async getMonthlySpending(userId: string): Promise<MonthlySpendingPointDTO[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const start = new Date();
    start.setMonth(start.getMonth() - 9, 1);
    start.setHours(0, 0, 0, 0);

    const agg = await RideBookingModel.aggregate([
      { $match: { hikerId: userObjectId, createdAt: { $gte: start } } },
      {
        $group: {
          _id: { m: { $month: '$createdAt' }, y: { $year: '$createdAt' } },
          total: { $sum: { $ifNull: ['$amount', 0] } },
        },
      },
    ]);

    const map = new Map<string, number>();
    for (const a of agg) map.set(`${a._id.y}-${a._id.m}`, a.total);

    const points: MonthlySpendingPointDTO[] = [];
    const current = new Date();
    for (let i = 9; i >= 0; i--) {
      const d = new Date(current.getFullYear(), current.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      points.push({
        month: monthLabel(d.getMonth()),
        spent: map.get(key) || 0,
      });
    }
    return points;
  }

  async getCostComparison(userId: string): Promise<CostComparisonDTO> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const [spentAgg, distAgg] = await Promise.all([
      RideBookingModel.aggregate([
        { $match: { hikerId: userObjectId } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$amount', 0] } } } },
      ]),
      RideBookingModel.aggregate([
        { $match: { hikerId: userObjectId } },
        {
          $group: {
            _id: null,
            km: { $sum: { $ifNull: ['$totalDistance', 0] } },
          },
        },
      ]),
    ]);
    const carpool = spentAgg[0]?.total || 0;
    const km = distAgg[0]?.km || 0;
    // naive estimates
    const taxi = Math.round(km * 25);
    const privateVehicle = Math.round(km * 12 + km * 2); // fuel + maint
    const savings = Math.max(0, taxi - carpool);
    return { carpool, taxi, privateVehicle, savings };
  }

  async getTopRoutes(userId: string, limit = 3): Promise<TopRouteDTO[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const riderRoutes = await RideLogModel.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: { from: '$pickupAddress', to: '$destinationAddress' },
          count: { $sum: 1 },
          km: { $sum: { $ifNull: ['$totalDistance', 0] } },
        },
      },
    ]);

    const hikerRoutes = await RideBookingModel.aggregate([
      { $match: { hikerId: userObjectId } },
      {
        $lookup: {
          from: 'ridelogs',
          localField: 'rideId',
          foreignField: '_id',
          as: 'ride',
        },
      },
      { $unwind: '$ride' },
      {
        $group: {
          _id: { from: '$ride.pickupAddress', to: '$ride.destinationAddress' },
          count: { $sum: 1 },
          km: { $sum: { $ifNull: ['$totalDistance', 0] } },
        },
      },
    ]);

    const map = new Map<
      string,
      { from: string; to: string; count: number; km: number }
    >();
    for (const r of riderRoutes) {
      const key = `${r._id.from}|${r._id.to}`;
      const prev = map.get(key) || {
        from: r._id.from,
        to: r._id.to,
        count: 0,
        km: 0,
      };
      map.set(key, {
        from: prev.from,
        to: prev.to,
        count: prev.count + r.count,
        km: prev.km + r.km,
      });
    }
    for (const h of hikerRoutes) {
      const key = `${h._id.from}|${h._id.to}`;
      const prev = map.get(key) || {
        from: h._id.from,
        to: h._id.to,
        count: 0,
        km: 0,
      };
      map.set(key, {
        from: prev.from,
        to: prev.to,
        count: prev.count + h.count,
        km: prev.km + h.km,
      });
    }

    const merged = Array.from(map.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
    return merged.map<TopRouteDTO>(m => ({
      from: m.from,
      to: m.to,
      count: m.count,
      km: Number(m.km.toFixed(1)),
    }));
  }

  async getRecentActivity(
    userId: string,
    limit = 5
  ): Promise<RecentActivityDTO[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const rideItems = await RideLogModel.find({ userId: userObjectId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const bookingItems = await RideBookingModel.aggregate([
      { $match: { hikerId: userObjectId } },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'ridelogs',
          localField: 'rideId',
          foreignField: '_id',
          as: 'ride',
        },
      },
      { $unwind: '$ride' },
    ]);

    const recent: RecentActivityDTO[] = [];
    for (const r of rideItems) {
      recent.push({
        id: String(r._id),
        type: 'ride',
        from: (r as any).pickupAddress,
        to: (r as any).destinationAddress,
        date: humanizeSince((r as any).createdAt as Date),
        amount: (r as any).totalEarning || 0,
        km: (r as any).totalDistance || 0,
        rating: 0,
      });
    }
    for (const b of bookingItems) {
      recent.push({
        id: String(b._id),
        type: 'hike',
        from: b.ride.pickupAddress,
        to: b.ride.destinationAddress,
        date: humanizeSince(b.createdAt as Date),
        amount: b.amount || 0,
        km: b.totalDistance || 0,
        rating: 0,
      });
    }

    recent.sort((a, b) => (a.date > b.date ? -1 : 1)); // already humanized; rely on fetch order
    return recent.slice(0, limit * 2);
  }

  async getEnvironmental(userId: string): Promise<EnvironmentalDTO> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const distAgg = await RideBookingModel.aggregate([
      { $match: { hikerId: userObjectId } },
      {
        $group: { _id: null, km: { $sum: { $ifNull: ['$totalDistance', 0] } } },
      },
    ]);
    const km = distAgg[0]?.km || 0;
    const co2Saved = Math.round(km * 0.15); // rough
    const treesEquivalent = Math.round(co2Saved / 22);
    const fuelSaved = Math.round(km / 15);
    return { co2Saved, treesEquivalent, fuelSaved };
  }

  async getOverview(userId: string): Promise<UserDashboardDTO> {
    const [
      stats,
      monthlyActivity,
      earnings,
      spending,
      costComparison,
      topRoutes,
      recentActivity,
      environmental,
    ] = await Promise.all([
      this.getStats(userId),
      this.getMonthlyActivity(userId),
      this.getMonthlyEarnings(userId),
      this.getMonthlySpending(userId),
      this.getCostComparison(userId),
      this.getTopRoutes(userId),
      this.getRecentActivity(userId, 3),
      this.getEnvironmental(userId),
    ]);

    return {
      stats,
      monthlyActivity,
      earnings,
      spending,
      costComparison,
      topRoutes,
      recentActivity,
      environmental,
      achievements: [],
    };
  }
}
