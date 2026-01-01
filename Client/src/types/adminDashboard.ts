export type DashboardRange = 'today' | 'monthly' | 'yearly';

export interface StatSummaryDTO {
  total: number;
  changePercent: number;
  trend: 'up' | 'down';
  subtitle?: string;
}

export interface MonthlyTrendPointDTO {
  label: string;
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
  count: number;
  rating: number;
  amount: number;
}

export interface RecentSOSDTO {
  id: string;
  userName: string;
  role: 'HIKER' | 'RIDER';
  location: { lat: number; lng: number } | null;
  status: 'active' | 'resolved';
  createdAt: string;
}

export interface QuickStatsDTO {
  completionRate: number;
  avgRating: number;
  cancelRate: number;
  platformRevenue: number;
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
