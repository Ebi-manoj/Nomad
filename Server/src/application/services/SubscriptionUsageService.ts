import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';
import { ISubscriptionUsageRepository } from '../repositories/ISubscriptionUsageRepository';
import { ISubscriptionUsageService } from './ISubscriptionUsageService';

export class SubscriptionUsageService implements ISubscriptionUsageService {
  constructor(private readonly usageRepository: ISubscriptionUsageRepository) {}

  async getUsage(userId: string): Promise<SubscriptionUsage> {
    let usage = await this.usageRepository.findByUserId(userId);
    if (!usage) {
      usage = await this.createUsage(userId);
    }

    return usage;
  }

  private async createUsage(userId: string): Promise<SubscriptionUsage> {
    const now = new Date();
    const month = now.getMonth() + 1;
    const usage = new SubscriptionUsage({
      userId,
      month: month.toString(),
    });

    return await this.usageRepository.create(usage);
  }
}
