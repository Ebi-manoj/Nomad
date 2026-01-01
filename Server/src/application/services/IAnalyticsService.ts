import {
  DashboardRange,
  MonthlyTrendPointDTO,
  QuickStatsDTO,
  StatSummaryDTO,
  StatusBreakdownDTO,
  TopPerformerDTO,
} from '../../domain/dto/adminDashboardDTO';

export interface IAnalyticsService {
  getUserStats(range: DashboardRange): Promise<StatSummaryDTO>;
  getRideStats(range: DashboardRange): Promise<StatSummaryDTO>;
  getHikeStats(range: DashboardRange): Promise<StatSummaryDTO>;
  getSosStats(range: DashboardRange): Promise<StatSummaryDTO>;

  getMonthlyTrends(range: DashboardRange): Promise<MonthlyTrendPointDTO[]>;
  getTopPerformers(range: DashboardRange): Promise<{
    riders: TopPerformerDTO[];
    hikers: TopPerformerDTO[];
  }>;
  getStatusBreakdown(range: DashboardRange): Promise<StatusBreakdownDTO>;
  getQuickStats(range: DashboardRange): Promise<QuickStatsDTO>;
}
