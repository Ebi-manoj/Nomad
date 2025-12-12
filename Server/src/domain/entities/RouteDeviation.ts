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
  private readonly _id?: string;
  private readonly _rideId: string;
  private readonly _hikeId: string;
  private readonly _hikerId: string;
  private readonly _riderId: string;
  private _currentLocation: GeoJSON.Point;
  private _deviationDistance: number;
  private _acknowledged: boolean;
  private _detectedAt: Date;
  private _acknowledgedAt?: Date;
  private _sosTriggeredAt?: Date;

  constructor(props: RouteDeviationProps) {
    this._id = props.id;
    this._rideId = props.rideId;
    this._hikeId = props.hikeId;
    this._hikerId = props.hikerId;
    this._riderId = props.riderId;
    this._currentLocation = props.currentLocation;
    this._deviationDistance = props.deviationDistance;
    this._acknowledged = props.acknowledged;
    this._detectedAt = props.detectedAt;
    this._acknowledgedAt = props.acknowledgedAt;
    this._sosTriggeredAt = props.sosTriggeredAt;
  }

  getId(): string | undefined {
    return this._id;
  }

  getRideId(): string {
    return this._rideId;
  }

  getHikeId(): string {
    return this._hikeId;
  }

  getHikerId(): string {
    return this._hikerId;
  }
  getRiderId(): string {
    return this._riderId;
  }

  getCurrentLocation(): GeoJSON.Point {
    return this._currentLocation;
  }

  getDeviationDistance(): number {
    return this._deviationDistance;
  }

  getAcknowledged(): boolean {
    return this._acknowledged;
  }

  getDetectedAt(): Date {
    return this._detectedAt;
  }

  getAcknowledgedAt(): Date | undefined {
    return this._acknowledgedAt;
  }

  getSosTriggeredAt(): Date | undefined {
    return this._sosTriggeredAt;
  }

  acknowledge(deviationTime: Date) {
    this._acknowledged = true;
    this._acknowledgedAt = deviationTime;
  }

  triggerSOS(time: Date) {
    this._sosTriggeredAt = time;
  }
}
