import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';
import { ISubscriptionUsageRepository } from '../repositories/ISubscriptionUsageRepository';
import { ISubscriptionUsageService } from './ISubscriptionUsageService';

export class SubscriptionUsageService implements ISubscriptionUsageService {
  constructor(
    private readonly _usageRepository: ISubscriptionUsageRepository
  ) {}

  async getUsage(userId: string): Promise<SubscriptionUsage> {
    let usage = await this._usageRepository.findByUserId(userId);
    if (!usage) {
      usage = await this.createUsage(userId);
    }

    return usage;
  }

  async incrementRideAccepetance(riderId: string): Promise<void> {
    const usage = await this.getUsage(riderId);
    usage.incrementRideAcceptances();
    await this._usageRepository.update(usage.getId()!, usage);
  }
  async incrementJoinRequest(hikerId: string): Promise<void> {
    const usage = await this.getUsage(hikerId);
    usage.incrementJoinRequests();
    await this._usageRepository.update(usage.getId()!, usage);
  }

  private async createUsage(userId: string): Promise<SubscriptionUsage> {
    const now = new Date();
    const month = now.getMonth() + 1;
    const usage = new SubscriptionUsage({
      userId,
      month: month.toString(),
    });

    return await this._usageRepository.create(usage);
  }
}
