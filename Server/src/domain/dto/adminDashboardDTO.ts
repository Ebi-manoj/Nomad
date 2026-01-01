import { SosInitiator } from '../enums/SosInitiator';

export type DashboardRange = 'today' | 'monthly' | 'yearly';

export interface StatSummaryDTO {
  total: number;
  changePercent: number; // compared to previous period
  trend: 'up' | 'down';
  subtitle?: string;
}

export interface MonthlyTrendPointDTO {
  label: string; // Month short name, day (DD), or hour (HH)
  rides: number;
  hikes: number;
}

export interface StatusBreakdownDTO {
  completed: number;
  cancelled: number;
  active: number;
}

export interface TopPerformerDTO {
  id: string;
  name: string;
  count: number; // rides for rider or hikes for hiker
  rating: number;
  amount: number; // earnings for rider or spent for hiker
}

export interface RecentSOSDTO {
  id: string;
  userName: string;
  role: SosInitiator; // HIKER/RIDER
  location: { lat: number; lng: number } | null;
  status: 'active' | 'resolved';
  createdAt: string; // ISO
}

export interface QuickStatsDTO {
  completionRate: number; // percentage 0-100
  avgRating: number; // 0-5
  cancelRate: number; // percentage 0-100
  platformRevenue: number; // in currency unit
}

export interface DashboardOverviewDTO {
  range: DashboardRange;
  stats: {
    users: StatSummaryDTO;
    rides: StatSummaryDTO;
    hikes: StatSummaryDTO;
    sosAlerts: StatSummaryDTO;
  };
  monthlyData: MonthlyTrendPointDTO[];
  statusBreakdown: StatusBreakdownDTO;
  topRiders: TopPerformerDTO[];
  topHikers: TopPerformerDTO[];
  recentSOS: RecentSOSDTO[];
  quickStats: QuickStatsDTO;
  lastUpdated: string;
}
