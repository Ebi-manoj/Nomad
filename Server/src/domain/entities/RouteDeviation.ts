export interface RouteDeviationProps {
  id?: string;
  rideId: string;
  hikeId: string;
  riderId: string;
  hikerId: string;
  currentLocation: GeoJSON.Point;
  deviationDistance: number;
  acknowledged: boolean;
  detectedAt: Date;
  acknowledgedAt?: Date;
  sosTriggeredAt?: Date;
}

export class RouteDeviation {
  private readonly id?: string;
  private readonly rideId: string;
  private readonly hikeId: string;
  private readonly hikerId: string;
  private readonly riderId: string;
  private currentLocation: GeoJSON.Point;
  private deviationDistance: number;
  private acknowledged: boolean;
  private detectedAt: Date;
  private acknowledgedAt?: Date;
  private sosTriggeredAt?: Date;

  constructor(props: RouteDeviationProps) {
    this.id = props.id;
    this.rideId = props.rideId;
    this.hikeId = props.hikeId;
    this.hikerId = props.hikerId;
    this.riderId = props.riderId;
    this.currentLocation = props.currentLocation;
    this.deviationDistance = props.deviationDistance;
    this.acknowledged = props.acknowledged;
    this.detectedAt = props.detectedAt;
    this.acknowledgedAt = props.acknowledgedAt;
    this.sosTriggeredAt = props.sosTriggeredAt;
  }

  getId(): string | undefined {
    return this.id;
  }

  getRideId(): string {
    return this.rideId;
  }

  getHikeId(): string {
    return this.hikeId;
  }

  getHikerId(): string {
    return this.hikerId;
  }
  getRiderId(): string {
    return this.riderId;
  }

  getCurrentLocation(): GeoJSON.Point {
    return this.currentLocation;
  }

  getDeviationDistance(): number {
    return this.deviationDistance;
  }

  getAcknowledged(): boolean {
    return this.acknowledged;
  }

  getDetectedAt(): Date {
    return this.detectedAt;
  }

  getAcknowledgedAt(): Date | undefined {
    return this.acknowledgedAt;
  }

  getSosTriggeredAt(): Date | undefined {
    return this.sosTriggeredAt;
  }

  acknowledge(deviationTime: Date) {
    this.acknowledged = true;
    this.acknowledgedAt = deviationTime;
  }

  triggerSOS(time: Date) {
    this.sosTriggeredAt = time;
  }
}
