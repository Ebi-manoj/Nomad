export interface SubscriptionUsageProps {
  id?: string;
  userId: string;
  month: string;
  joinRequestsCount?: number;
  rideAcceptancesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SubscriptionUsage {
  private _id?: string;
  private _userId: string;
  private _month: string;
  private _joinRequestsCount: number;
  private _rideAcceptancesCount: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: SubscriptionUsageProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._month = props.month;
    this._joinRequestsCount = props.joinRequestsCount ?? 0;
    this._rideAcceptancesCount = props.rideAcceptancesCount ?? 0;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this._id;
  }

  getUserId(): string {
    return this._userId;
  }

  getMonth(): string {
    return this._month;
  }

  getJoinRequestsCount(): number {
    return this._joinRequestsCount;
  }

  getRideAcceptancesCount(): number {
    return this._rideAcceptancesCount;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  incrementJoinRequests(): void {
    this._joinRequestsCount++;
    this._updatedAt = new Date();
  }

  incrementRideAcceptances(): void {
    this._rideAcceptancesCount++;
    this._updatedAt = new Date();
  }

  canCreateJoinRequest(maxLimit: number | null): boolean {
    if (maxLimit === null) return true;
    return this._joinRequestsCount < maxLimit;
  }

  canAcceptRide(maxLimit: number | null): boolean {
    if (maxLimit === null) return true;
    return this._rideAcceptancesCount < maxLimit;
  }
}
