export interface SubscriptionUsageProps {
  id?: string;
  userId: string;
  subscriptionId: string;
  month: string;
  joinRequestsCount?: number;
  rideAcceptancesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SubscriptionUsage {
  private id?: string;
  private userId: string;
  private subscriptionId: string;
  private month: string;
  private joinRequestsCount: number;
  private rideAcceptancesCount: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: SubscriptionUsageProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.subscriptionId = props.subscriptionId;
    this.month = props.month;
    this.joinRequestsCount = props.joinRequestsCount ?? 0;
    this.rideAcceptancesCount = props.rideAcceptancesCount ?? 0;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getSubscriptionId(): string {
    return this.subscriptionId;
  }

  getMonth(): string {
    return this.month;
  }

  getJoinRequestsCount(): number {
    return this.joinRequestsCount;
  }

  getRideAcceptancesCount(): number {
    return this.rideAcceptancesCount;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  incrementJoinRequests(): void {
    this.joinRequestsCount++;
    this.updatedAt = new Date();
  }

  incrementRideAcceptances(): void {
    this.rideAcceptancesCount++;
    this.updatedAt = new Date();
  }

  canCreateJoinRequest(maxLimit: number | null): boolean {
    if (maxLimit === null) return true;
    return this.joinRequestsCount < maxLimit;
  }

  canAcceptRide(maxLimit: number | null): boolean {
    if (maxLimit === null) return true;
    return this.rideAcceptancesCount < maxLimit;
  }
}
