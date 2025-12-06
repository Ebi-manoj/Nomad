import {
  BillingCycle,
  SubscriptionStatus,
  SubscriptionTier,
} from '../enums/subscription';

export class SubscriptionFeatures {
  constructor(
    private readonly maxJoinRequestsPerRide: number | null,
    private readonly maxRideAcceptancesPerMonth: number | null,
    private readonly platformFeePercentage: number,
    private readonly verificationBadge: boolean,
    private readonly priorityInList: boolean,
    private readonly customCostSharing: boolean
  ) {}

  getMaxJoinRequestsPerRide(): number | null {
    return this.maxJoinRequestsPerRide;
  }

  getMaxRideAcceptancesPerMonth(): number | null {
    return this.maxRideAcceptancesPerMonth;
  }

  getPlatformFeePercentage(): number {
    return this.platformFeePercentage;
  }

  hasVerificationBadge(): boolean {
    return this.verificationBadge;
  }

  hasPriorityInList(): boolean {
    return this.priorityInList;
  }

  hasCustomCostSharing(): boolean {
    return this.customCostSharing;
  }
}

export interface SubscriptionProps {
  id?: string;
  userId: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate?: Date;
  endDate?: Date;
  autoRenew?: boolean;
  price: number;
  currency?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  stripePriceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  cancelledAt?: Date;
}

export class Subscription {
  private id?: string;
  private userId: string;
  private tier: SubscriptionTier;
  private billingCycle: BillingCycle;
  private status: SubscriptionStatus;
  private startDate: Date;
  private endDate: Date;
  private autoRenew: boolean;
  private price: number;
  private currency: string;
  private stripeSubscriptionId?: string;
  private stripeCustomerId?: string;
  private stripePriceId?: string;
  private createdAt: Date;
  private updatedAt: Date;
  private cancelledAt?: Date;
  private features: SubscriptionFeatures;

  constructor(props: SubscriptionProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.tier = props.tier;
    this.billingCycle = props.billingCycle;
    this.status = props.status;
    this.startDate = props.startDate || new Date();
    this.endDate = props.endDate || new Date();
    this.autoRenew = props.autoRenew ?? true;
    this.price = props.price;
    this.currency = props.currency || 'INR';
    this.stripeSubscriptionId = props.stripeSubscriptionId;
    this.stripeCustomerId = props.stripeCustomerId;
    this.stripePriceId = props.stripePriceId;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.cancelledAt = props.cancelledAt;
    this.features = this.initializeFeatures();
  }

  private initializeFeatures(): SubscriptionFeatures {
    switch (this.tier) {
      case SubscriptionTier.FREE:
        return new SubscriptionFeatures(3, 20, 10, false, false, false);
      case SubscriptionTier.HIKER_PRO:
        return new SubscriptionFeatures(null, null, 5, true, true, false);
      case SubscriptionTier.RIDER_PRO:
        return new SubscriptionFeatures(null, null, 5, true, true, true);
      case SubscriptionTier.PREMIUM_PLUS:
        return new SubscriptionFeatures(null, null, 3, true, true, true);
      default:
        return new SubscriptionFeatures(3, 20, 10, false, false, false);
    }
  }

  getId(): string | undefined {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getTier(): SubscriptionTier {
    return this.tier;
  }

  getBillingCycle(): BillingCycle {
    return this.billingCycle;
  }

  getStatus(): SubscriptionStatus {
    return this.status;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  isAutoRenew(): boolean {
    return this.autoRenew;
  }

  getPrice(): number {
    return this.price;
  }

  getCurrency(): string {
    return this.currency;
  }

  getStripeSubscriptionId(): string | undefined {
    return this.stripeSubscriptionId;
  }
  getStripeCustomerId(): string | undefined {
    return this.stripeCustomerId;
  }
  getStripePriceId(): string | undefined {
    return this.stripePriceId;
  }

  getFeatures(): SubscriptionFeatures {
    return this.features;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getCancelledAt(): Date | undefined {
    return this.cancelledAt;
  }

  isActive(): boolean {
    return this.status === SubscriptionStatus.ACTIVE && new Date() < this.endDate;
  }

  isExpired(): boolean {
    return new Date() >= this.endDate;
  }

  cancel(): void {
    if (this.status === SubscriptionStatus.CANCELLED) {
      throw new Error('Subscription is already cancelled');
    }
    this.status = SubscriptionStatus.CANCELLED;
    this.autoRenew = false;
    this.cancelledAt = new Date();
    this.updatedAt = new Date();
  }

  renew(newEndDate: Date, price: number): void {
    if (this.status === SubscriptionStatus.CANCELLED) {
      throw new Error('Cannot renew a cancelled subscription');
    }
    this.startDate = this.endDate;
    this.endDate = newEndDate;
    this.price = price;
    this.status = SubscriptionStatus.ACTIVE;
    this.updatedAt = new Date();
  }
}
