import type { DashboardRange } from '../../domain/dto/adminDashboardDTO';
import type {
  RevenueOverviewDTO,
  RevenueSummaryDTO,
  RevenueTrendPointDTO,
  RevenueTransactionDTO,
  RevenueTransactionStatus,
  SubscriptionTrendPointDTO,
} from '../../domain/dto/adminRevenueDTO';
import { IRevenueService } from '../../application/services/IRevenueService';
import { PaymentModel } from '../database/payment.model';
import { RideLogModel } from '../database/ridelog.mode';
import { SubscriptionModel } from '../database/Subscription.model';
import { UserModel } from '../database/user.model';
import { PaymentStatus } from '../../domain/enums/payment';
import { RideStatus } from '../../domain/enums/Ride';

function getRangeDates(range: DashboardRange): {
  start: Date;
  end: Date;
  prevStart: Date;
  prevEnd: Date;
} {
  const now = new Date();
  const end = now;
  if (range === 'today') {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const prevStart = new Date(start);
    prevStart.setDate(start.getDate() - 1);
    const prevEnd = new Date(start);
    prevEnd.setMilliseconds(-1);
    return { start, end, prevStart, prevEnd };
  }
  if (range === 'monthly') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    return { start, end, prevStart, prevEnd };
  }
  // yearly
  const start = new Date(now.getFullYear(), 0, 1);
  const prevStart = new Date(now.getFullYear() - 1, 0, 1);
  const prevEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
  return { start, end, prevStart, prevEnd };
}

function monthLabel(idx: number) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return labels[idx];
}

function computeGrowth(current: number, previous: number): number {
  if (previous <= 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export class RevenueService implements IRevenueService {
  async getOverview(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date; page?: number; limit?: number }
  ): Promise<RevenueOverviewDTO> {
    // determine date range (custom vs preset)
    let start: Date;
    let end: Date;
    let prevStart: Date;
    let prevEnd: Date;
    const custom = Boolean(options?.startDate && options?.endDate);
    if (custom) {
      start = new Date(options!.startDate!);
      end = new Date(options!.endDate!);
      
      if (
        end.getHours() === 0 &&
        end.getMinutes() === 0 &&
        end.getSeconds() === 0 &&
        end.getMilliseconds() === 0
      ) {
        end.setHours(23, 59, 59, 999);
      }
      const periodMs = end.getTime() - start.getTime();
      prevEnd = new Date(start.getTime() - 1);
      prevStart = new Date(prevEnd.getTime() - periodMs);
    } else {
      const preset = getRangeDates(range);
      start = preset.start;
      end = preset.end;
      prevStart = preset.prevStart;
      prevEnd = preset.prevEnd;
    }

    const granularity: 'hourly' | 'weekly' | 'monthly' | 'daily' = custom
      ? 'daily'
      : range === 'today'
      ? 'hourly'
      : range === 'monthly'
      ? 'weekly'
      : 'monthly';

    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.max(1, Math.min(options?.limit ?? 10, 100));

    const [summary, prevSummary, trendData, subTrend, txData] = await Promise.all([
      this.computeSummary(start, end),
      this.computeSummary(prevStart, prevEnd),
      this.computeTrendByGranularity(granularity, start, end),
      this.computeSubscriptionTrendByGranularity(granularity, start, end),
      this.getRecentTransactionsWithPagination(start, end, page, limit),
    ]);

    const growth = computeGrowth(summary.totalRevenue, prevSummary.totalRevenue);

    const overview: RevenueOverviewDTO = {
      range,
      summary: { ...summary, growth },
      trendData,
      subscriptionTrend: subTrend,
      transactions: txData.transactions,
      pagination: txData.pagination,
    };
    return overview;
  }

  // Export full report data (no pagination), with optional custom date range
  async getReport(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date }
  ): Promise<{ summary: RevenueSummaryDTO; transactions: RevenueTransactionDTO[] }> {
    // determine date range
    let start: Date;
    let end: Date;
    const custom = Boolean(options?.startDate && options?.endDate);
    if (custom) {
      start = new Date(options!.startDate!);
      end = new Date(options!.endDate!);
      if (
        end.getHours() === 0 &&
        end.getMinutes() === 0 &&
        end.getSeconds() === 0 &&
        end.getMilliseconds() === 0
      ) {
        end.setHours(23, 59, 59, 999);
      }
    } else {
      const preset = getRangeDates(range);
      start = preset.start;
      end = preset.end;
    }

    const [summary, transactions] = await Promise.all([
      this.computeSummary(start, end),
      this.getAllTransactions(start, end),
    ]);
    return { summary, transactions };
  }

  private async computeSummary(start: Date, end: Date): Promise<RevenueSummaryDTO> {
    // Ride Commission from payments (platformFee)
    const [rideAgg, hikeAgg, subAgg] = await Promise.all([
      PaymentModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$platformFee', 0] } } } },
      ]),
      RideLogModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end }, status: RideStatus.COMPLETED } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$platformFee', 0] } } } },
      ]),
      SubscriptionModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$price', 0] } } } },
      ]),
    ]);

    const rideCommission = rideAgg[0]?.total || 0;
    const hikeCommission = hikeAgg[0]?.total || 0;
    const subscriptions = subAgg[0]?.total || 0;
    const totalRevenue = rideCommission + hikeCommission + subscriptions;

    return { totalRevenue, hikeCommission, rideCommission, subscriptions, growth: 0 };
  }

  private async computeTrendByGranularity(
    gran: 'hourly' | 'weekly' | 'monthly' | 'daily',
    start: Date,
    end: Date
  ): Promise<RevenueTrendPointDTO[]> {
    if (gran === 'monthly') {
      const [ride, hike] = await Promise.all([
        PaymentModel.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS } },
          { $group: { _id: { m: { $month: '$createdAt' } }, total: { $sum: { $ifNull: ['$platformFee', 0] } } } },
        ]),
        RideLogModel.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end }, status: RideStatus.COMPLETED } },
          { $group: { _id: { m: { $month: '$createdAt' } }, total: { $sum: { $ifNull: ['$platformFee', 0] } } } },
        ]),
      ]);
      const mapR = new Map<number, number>();
      const mapH = new Map<number, number>();
      for (const r of ride) mapR.set(r._id.m, r.total || 0);
      for (const h of hike) mapH.set(h._id.m, h.total || 0);
      const points: RevenueTrendPointDTO[] = [];
      for (let m = 1; m <= 12; m++) {
        points.push({
          period: monthLabel(m - 1),
          hikeCommission: mapH.get(m) || 0,
          rideCommission: mapR.get(m) || 0,
        });
      }
      return points;
    }

    if (gran === 'weekly') {
      // group by week of month (1..4)
      const projectWeek = {
        $project: {
          createdAt: 1,
          sumRide: { $ifNull: ['$platformFee', 0] },
          week: { $add: [{ $floor: { $divide: [{ $subtract: [{ $dayOfMonth: '$createdAt' }, 1] }, 7] } }, 1] },
        },
      } as const;
      const [ride, hike] = await Promise.all([
        PaymentModel.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS } },
          projectWeek,
          { $group: { _id: '$week', total: { $sum: '$sumRide' } } },
        ]),
        RideLogModel.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end }, status: RideStatus.COMPLETED } },
          {
            $project: {
              createdAt: 1,
              sumRide: { $ifNull: ['$platformFee', 0] },
              week: { $add: [{ $floor: { $divide: [{ $subtract: [{ $dayOfMonth: '$createdAt' }, 1] }, 7] } }, 1] },
            },
          },
          { $group: { _id: '$week', total: { $sum: '$sumRide' } } },
        ]),
      ]);
      const mapR = new Map<number, number>();
      const mapH = new Map<number, number>();
      for (const r of ride) mapR.set(r._id, r.total || 0);
      for (const h of hike) mapH.set(h._id, h.total || 0);
      const points: RevenueTrendPointDTO[] = [];
      for (let w = 1; w <= 4; w++) {
        points.push({
          period: `Week ${w}`,
          hikeCommission: mapH.get(w) || 0,
          rideCommission: mapR.get(w) || 0,
        });
      }
      return points;
    }

    if (gran === 'hourly') {
      // today: group into 6 buckets each 4 hours
      const projectBucket = {
        $project: {
          createdAt: 1,
          value: 1,
          bucket: { $floor: { $divide: [{ $hour: '$createdAt' }, 4] } },
        },
      } as const;
      const [ride, hike] = await Promise.all([
        PaymentModel.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS } },
          { $project: { createdAt: 1, value: { $ifNull: ['$platformFee', 0] } } },
          projectBucket,
          { $group: { _id: '$bucket', total: { $sum: '$value' } } },
        ]),
        RideLogModel.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end }, status: RideStatus.COMPLETED } },
          { $project: { createdAt: 1, value: { $ifNull: ['$platformFee', 0] } } },
          projectBucket,
          { $group: { _id: '$bucket', total: { $sum: '$value' } } },
        ]),
      ]);
      const mapR = new Map<number, number>();
      const mapH = new Map<number, number>();
      for (const r of ride) mapR.set(r._id, r.total || 0);
      for (const h of hike) mapH.set(h._id, h.total || 0);
      const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
      const points: RevenueTrendPointDTO[] = [];
      for (let b = 0; b < 6; b++) {
        points.push({
          period: labels[b],
          hikeCommission: mapH.get(b) || 0,
          rideCommission: mapR.get(b) || 0,
        });
      }
      return points;
    }

    // daily custom range
    const [ride, hike] = await Promise.all([
      PaymentModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS } },
        { $group: { _id: { d: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } }, total: { $sum: { $ifNull: ['$platformFee', 0] } } } },
      ]),
      RideLogModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end }, status: RideStatus.COMPLETED } },
        { $group: { _id: { d: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } }, total: { $sum: { $ifNull: ['$platformFee', 0] } } } },
      ]),
    ]);
    const mapR = new Map<string, number>();
    const mapH = new Map<string, number>();
    for (const r of ride) mapR.set(r._id.d, r.total || 0);
    for (const h of hike) mapH.set(h._id.d, h.total || 0);

    const points: RevenueTrendPointDTO[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const key = cursor.toISOString().slice(0, 10);
      points.push({
        period: key,
        hikeCommission: mapH.get(key) || 0,
        rideCommission: mapR.get(key) || 0,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    return points;
  }

  private async computeSubscriptionTrendByGranularity(
    gran: 'hourly' | 'weekly' | 'monthly' | 'daily',
    start: Date,
    end: Date
  ): Promise<SubscriptionTrendPointDTO[]> {
    if (gran === 'monthly') {
      const subs = await SubscriptionModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: { m: { $month: '$createdAt' } }, total: { $sum: { $ifNull: ['$price', 0] } } } },
      ]);
      const mapS = new Map<number, number>();
      for (const s of subs) mapS.set(s._id.m, s.total || 0);
      const points: SubscriptionTrendPointDTO[] = [];
      for (let m = 1; m <= 12; m++) {
        points.push({ period: monthLabel(m - 1), subscriptions: mapS.get(m) || 0 });
      }
      return points;
    }

    if (gran === 'weekly') {
      const subs = await SubscriptionModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        {
          $project: {
            createdAt: 1,
            value: { $ifNull: ['$price', 0] },
            week: { $add: [{ $floor: { $divide: [{ $subtract: [{ $dayOfMonth: '$createdAt' }, 1] }, 7] } }, 1] },
          },
        },
        { $group: { _id: '$week', total: { $sum: '$value' } } },
      ]);
      const mapS = new Map<number, number>();
      for (const s of subs) mapS.set(s._id, s.total || 0);
      const points: SubscriptionTrendPointDTO[] = [];
      for (let w = 1; w <= 4; w++) {
        points.push({ period: `Week ${w}`, subscriptions: mapS.get(w) || 0 });
      }
      return points;
    }

    if (gran === 'hourly') {
      const projectBucket = {
        $project: {
          createdAt: 1,
          value: { $ifNull: ['$price', 0] },
          bucket: { $floor: { $divide: [{ $hour: '$createdAt' }, 4] } },
        },
      } as const;
      const subs = await SubscriptionModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        projectBucket,
        { $group: { _id: '$bucket', total: { $sum: '$value' } } },
      ]);
      const mapS = new Map<number, number>();
      for (const s of subs) mapS.set(s._id, s.total || 0);
      const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
      const points: SubscriptionTrendPointDTO[] = [];
      for (let b = 0; b < 6; b++) {
        points.push({ period: labels[b], subscriptions: mapS.get(b) || 0 });
      }
      return points;
    }

    // daily custom
    const subs = await SubscriptionModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: { d: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } }, total: { $sum: { $ifNull: ['$price', 0] } } } },
    ]);
    const mapS = new Map<string, number>();
    for (const s of subs) mapS.set(s._id.d, s.total || 0);
    const points: SubscriptionTrendPointDTO[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const key = cursor.toISOString().slice(0, 10);
      points.push({ period: key, subscriptions: mapS.get(key) || 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    return points;
  }

  private async getRecentTransactionsWithPagination(
    start: Date,
    end: Date,
    page: number,
    limit: number
  ): Promise<{ transactions: RevenueTransactionDTO[]; pagination: { page: number; limit: number; total: number; hasNext: boolean; hasPrev: boolean } }> {
    const skip = (page - 1) * limit;

    const [paymentsTotal, ridesTotal, subsTotal] = await Promise.all([
      PaymentModel.countDocuments({ createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS }),
      RideLogModel.countDocuments({ createdAt: { $gte: start, $lte: end }, status: RideStatus.COMPLETED, platformFee: { $gt: 0 } }),
      SubscriptionModel.countDocuments({ createdAt: { $gte: start, $lte: end } }),
    ]);

    const total = paymentsTotal + ridesTotal + subsTotal;

    const fetchN = skip + limit;
    const [payments, rides, subs] = await Promise.all([
      PaymentModel.find({ createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS })
        .sort({ createdAt: -1 })
        .limit(fetchN)
        .lean(),
      RideLogModel.find({ createdAt: { $gte: start, $lte: end }, platformFee: { $gt: 0 }, status: RideStatus.COMPLETED })
        .sort({ createdAt: -1 })
        .limit(fetchN)
        .lean(),
      SubscriptionModel.find({ createdAt: { $gte: start, $lte: end } })
        .sort({ createdAt: -1 })
        .limit(fetchN)
        .lean(),
    ]);

    const userIds = new Set<string>();
    for (const p of payments) userIds.add(String(p.hikerId));
    for (const r of rides) userIds.add(String(r.userId));
    for (const s of subs) userIds.add(String(s.userId));
    const users = await UserModel.find({ _id: { $in: Array.from(userIds).map(id => id) } })
      .select('fullName')
      .lean();
    const nameMap = new Map<string, string>();
    for (const u of users) nameMap.set(String(u._id), u.fullName);

    const mapPaymentStatus = (s: PaymentStatus): RevenueTransactionStatus => {
      if (s === PaymentStatus.SUCCESS) return 'completed';
      if (s === PaymentStatus.PENDING) return 'pending';
      return 'failed';
    };

    const tx: RevenueTransactionDTO[] = [];
    for (const p of payments) {
      tx.push({
        id: String(p._id),
        date: new Date(p.createdAt as Date).toISOString(),
        type: 'Ride Commission',
        userName: nameMap.get(String(p.hikerId)) || 'Unknown',
        amount: p.platformFee || 0,
        status: mapPaymentStatus(p.status as PaymentStatus),
      });
    }
    for (const r of rides) {
      tx.push({
        id: String(r._id),
        date: new Date(r.createdAt as Date).toISOString(),
        type: 'Hike Commission',
        userName: nameMap.get(String(r.userId)) || 'Unknown',
        amount: r.platformFee || 0,
        status: r.status === RideStatus.COMPLETED ? 'completed' : 'pending',
      });
    }
    for (const s of subs) {
      tx.push({
        id: String(s._id),
        date: new Date(s.createdAt as Date).toISOString(),
        type: 'Subscription',
        userName: nameMap.get(String(s.userId)) || 'Unknown',
        amount: s.price || 0,
        status: 'completed',
      });
    }

    tx.sort((a, b) => (a.date > b.date ? -1 : 1));
    const pageItems = tx.slice(skip, skip + limit);
    const pagination = {
      page,
      limit,
      total,
      hasNext: skip + limit < total,
      hasPrev: page > 1,
    };
    return { transactions: pageItems, pagination };
  }

  private async getAllTransactions(
    start: Date,
    end: Date
  ): Promise<RevenueTransactionDTO[]> {
    const [payments, rides, subs] = await Promise.all([
      PaymentModel.find({ createdAt: { $gte: start, $lte: end }, status: PaymentStatus.SUCCESS })
        .sort({ createdAt: -1 })
        .lean(),
      RideLogModel.find({ createdAt: { $gte: start, $lte: end }, platformFee: { $gt: 0 }, status: RideStatus.COMPLETED })
        .sort({ createdAt: -1 })
        .lean(),
      SubscriptionModel.find({ createdAt: { $gte: start, $lte: end } })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    const userIds = new Set<string>();
    for (const p of payments) userIds.add(String(p.hikerId));
    for (const r of rides) userIds.add(String(r.userId));
    for (const s of subs) userIds.add(String(s.userId));
    const users = await UserModel.find({ _id: { $in: Array.from(userIds).map(id => id) } })
      .select('fullName')
      .lean();
    const nameMap = new Map<string, string>();
    for (const u of users) nameMap.set(String(u._id), u.fullName);

    const mapPaymentStatus = (s: PaymentStatus): RevenueTransactionStatus => {
      if (s === PaymentStatus.SUCCESS) return 'completed';
      if (s === PaymentStatus.PENDING) return 'pending';
      return 'failed';
    };

    const tx: RevenueTransactionDTO[] = [];
    for (const p of payments) {
      tx.push({
        id: String(p._id),
        date: new Date(p.createdAt as Date).toISOString(),
        type: 'Ride Commission',
        userName: nameMap.get(String(p.hikerId)) || 'Unknown',
        amount: p.platformFee || 0,
        status: mapPaymentStatus(p.status as PaymentStatus),
      });
    }
    for (const r of rides) {
      tx.push({
        id: String(r._id),
        date: new Date(r.createdAt as Date).toISOString(),
        type: 'Hike Commission',
        userName: nameMap.get(String(r.userId)) || 'Unknown',
        amount: r.platformFee || 0,
        status: r.status === RideStatus.COMPLETED ? 'completed' : 'pending',
      });
    }
    for (const s of subs) {
      tx.push({
        id: String(s._id),
        date: new Date(s.createdAt as Date).toISOString(),
        type: 'Subscription',
        userName: nameMap.get(String(s.userId)) || 'Unknown',
        amount: s.price || 0,
        status: 'completed',
      });
    }

    tx.sort((a, b) => (a.date > b.date ? -1 : 1));
    return tx;
  }
}
