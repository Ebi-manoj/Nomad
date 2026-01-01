import { DashboardOverviewDTO, DashboardRange, RecentSOSDTO } from '../../../domain/dto/adminDashboardDTO';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { ISosLogRepository } from '../../repositories/ISosLogRepository';
import { IAnalyticsService } from '../../services/IAnalyticsService';
import { SosLogStatus } from '../../../domain/enums/SosLogStatus';

export class GetDashboardOverviewUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _sosRepository: ISosLogRepository,
    private readonly _analyticsService: IAnalyticsService
  ) {}

  async execute(range: DashboardRange): Promise<DashboardOverviewDTO> {
    // touch injected repos to avoid unused warnings in strict builds
    void this._rideRepository;
    void this._hikeRepository;
    const [
      users,
      rides,
      hikes,
      sos,
      monthlyData,
      topPerformers,
      statusBreakdown,
      quickStats,
      recentSOSLogs,
    ] = await Promise.all([
      this._analyticsService.getUserStats(range),
      this._analyticsService.getRideStats(range),
      this._analyticsService.getHikeStats(range),
      this._analyticsService.getSosStats(range),
      this._analyticsService.getMonthlyTrends(range),
      this._analyticsService.getTopPerformers(range),
      this._analyticsService.getStatusBreakdown(range),
      this._analyticsService.getQuickStats(range),
      this._sosRepository.findAll(0, 3),
    ]);

    const recentSOS: RecentSOSDTO[] = await Promise.all(
      recentSOSLogs.map(async log => {
        const user = await this._userRepository.findById(log.getUserId());
        const coords = log.getLocation()?.coordinates as [number, number] | undefined;
        return {
          id: log.getId()!,
          userName: user ? user.getFullName() : 'Unknown',
          role: log.getInitiatedBy(),
          location: coords ? { lat: coords[1], lng: coords[0] } : null,
          status: log.getStatus() === SosLogStatus.RESOLVED ? 'resolved' : 'active',
          createdAt: log.getCreatedAt().toISOString(),
        };
      })
    );

    return {
      range,
      stats: {
        users,
        rides,
        hikes,
        sosAlerts: sos,
      },
      monthlyData,
      statusBreakdown,
      topRiders: topPerformers.riders,
      topHikers: topPerformers.hikers,
      recentSOS,
      quickStats,
      lastUpdated: new Date().toISOString(),
    };
  }
}
