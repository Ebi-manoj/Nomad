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

export interface IInsightService {
  getStats(userId: string): Promise<UserStatsDTO>;
  getMonthlyActivity(userId: string): Promise<MonthlyActivityPointDTO[]>;
  getMonthlyEarnings(userId: string): Promise<MonthlyEarningPointDTO[]>;
  getMonthlySpending(userId: string): Promise<MonthlySpendingPointDTO[]>;
  getCostComparison(userId: string): Promise<CostComparisonDTO>;
  getTopRoutes(userId: string, limit?: number): Promise<TopRouteDTO[]>;
  getRecentActivity(userId: string, limit?: number): Promise<RecentActivityDTO[]>;
  getEnvironmental(userId: string): Promise<EnvironmentalDTO>;

  getOverview(userId: string): Promise<UserDashboardDTO>;
}
