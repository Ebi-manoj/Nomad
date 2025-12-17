import { BillingCycle, SubscriptionStatus } from '../enums/subscription';

export class SubscriptionFeatures {
  constructor(
    private readonly _maxJoinRequestsPerRide: number | null,
    private readonly _maxRideAcceptancesPerMonth: number | null,
    private readonly _platformFeePercentage: number,
    private readonly _verificationBadge: boolean,
    private readonly _priorityInList: boolean,
    private readonly _customCostSharing: boolean
  ) {}

  getMaxJoinRequestsPerRide(): number | null {
    return this._maxJoinRequestsPerRide;
  }

  getMaxRideAcceptancesPerMonth(): number | null {
    return this._maxRideAcceptancesPerMonth;
  }

  getPlatformFeePercentage(): number {
    return this._platformFeePercentage;
  }

  hasVerificationBadge(): boolean {
    return this._verificationBadge;
  }

  hasPriorityInList(): boolean {
    return this._priorityInList;
  }

  hasCustomCostSharing(): boolean {
    return this._customCostSharing;
  }
  toJson() {
    return {
      maxJoinRequestsPerRide: this._maxJoinRequestsPerRide,
      maxRideAcceptancesPerMonth: this._maxRideAcceptancesPerMonth,
      platformFeePercentage: this._platformFeePercentage,
      verificationBadge: this._verificationBadge,
      priorityInList: this._priorityInList,
      customCostSharing: this._customCostSharing,
    };
  }
}

export interface SubscriptionProps {
  id?: string;
  userId: string;
  planId: string;
  tier: string;
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
  isDefault?: boolean;
  cancelledAt?: Date;
  features: SubscriptionFeatures;
}

export class Subscription {
  private _id?: string;
  private _userId: string;
  private _planId: string;
  private _tier: string;
  private _billingCycle: BillingCycle;
  private _status: SubscriptionStatus;
  private _startDate: Date;
  private _endDate: Date;
  private _autoRenew: boolean;
  private _price: number;
  private _currency: string;
  private _stripeSubscriptionId?: string;
  private _stripeCustomerId?: string;
  private _stripePriceId?: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _cancelledAt?: Date;
  private _features: SubscriptionFeatures;

  constructor(props: SubscriptionProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._tier = props.tier;
    this._planId = props.planId;
    this._billingCycle = props.billingCycle;
    this._status = props.status;
    this._startDate = props.startDate || new Date();
    this._endDate = props.endDate || this.setEndDate();
    this._autoRenew = props.autoRenew ?? true;
    this._price = props.price;
    this._currency = props.currency || 'INR';
    this._stripeSubscriptionId = props.stripeSubscriptionId;
    this._stripeCustomerId = props.stripeCustomerId;
    this._stripePriceId = props.stripePriceId;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this._cancelledAt = props.cancelledAt;
    this._features = props.features;
  }

  getId(): string | undefined {
    return this._id;
  }

  getUserId(): string {
    return this._userId;
  }

  private setEndDate(): Date {
    const startDate = this._startDate.getTime();
    const duration =
      this._billingCycle === 'MONTHLY'
        ? 30 * 24 * 60 * 60 * 1000
        : 365 * 24 * 60 * 60 * 1000;

    return new Date(startDate + duration);
  }

  getTier(): string {
    return this._tier;
  }

  getBillingCycle(): BillingCycle {
    return this._billingCycle;
  }

  getStatus(): SubscriptionStatus {
    return this._status;
  }

  getStartDate(): Date {
    return this._startDate;
  }

  getEndDate(): Date {
    return this._endDate;
  }

  isAutoRenew(): boolean {
    return this._autoRenew;
  }

  getPlanId() {
    return this._planId;
  }

  getPrice(): number {
    return this._price;
  }

  getCurrency(): string {
    return this._currency;
  }

  getStripeSubscriptionId(): string | undefined {
    return this._stripeSubscriptionId;
  }
  getStripeCustomerId(): string | undefined {
    return this._stripeCustomerId;
  }
  getStripePriceId(): string | undefined {
    return this._stripePriceId;
  }

  getFeatures(): SubscriptionFeatures {
    return this._features;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  getCancelledAt(): Date | undefined {
    return this._cancelledAt;
  }

  isActive(): boolean {
    return (
      this._status === SubscriptionStatus.ACTIVE && new Date() < this._endDate
    );
  }
  isExpired(): boolean {
    return new Date() >= this._endDate;
  }

  cancel(): void {
    if (this._status === SubscriptionStatus.CANCELLED) {
      throw new Error('Subscription is already cancelled');
    }
    this._status = SubscriptionStatus.CANCELLED;
    this._autoRenew = false;
    this._cancelledAt = new Date();
    this._updatedAt = new Date();
  }

  renew(newEndDate: Date, price: number): void {
    if (this._status === SubscriptionStatus.CANCELLED) {
      throw new Error('Cannot renew a cancelled subscription');
    }
    this._startDate = this._endDate;
    this._endDate = newEndDate;
    this._price = price;
    this._status = SubscriptionStatus.ACTIVE;
    this._updatedAt = new Date();
  }
}
