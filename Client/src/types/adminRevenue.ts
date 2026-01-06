export type DashboardRange = 'today' | 'monthly' | 'yearly';

export interface RevenueTrendPointDTO {
  period: string;
  hikeCommission: number;
  rideCommission: number;
}

export interface RevenueSummaryDTO {
  totalRevenue: number;
  hikeCommission: number;
  rideCommission: number;
  subscriptions: number;
  growth: number;
}

export interface PaginationDTO {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type RevenueTransactionType =
  | 'Hike Commission'
  | 'Ride Commission'
  | 'Subscription';

export type RevenueTransactionStatus = 'completed' | 'pending' | 'failed';

export interface RevenueTransactionDTO {
  id: string;
  date: string;
  type: RevenueTransactionType;
  userName: string;
  amount: number;
  status: RevenueTransactionStatus;
}

export interface SubscriptionTrendPointDTO {
  period: string;
  subscriptions: number;
}

export interface RevenueOverviewDTO {
  range: DashboardRange;
  summary: RevenueSummaryDTO;
  trendData: RevenueTrendPointDTO[];
  transactions: RevenueTransactionDTO[];
  pagination: PaginationDTO;
  subscriptionTrend: SubscriptionTrendPointDTO[];
}
