export interface LocationProps {
  rideId: string;
  lat: number;
  lng: number;
}

export class Location {
  public readonly rideId;
  public readonly lat;
  public readonly lng;
  constructor(props: LocationProps) {
    this.rideId = props.rideId;
    this.lat = props.lat;
    this.lng = props.lng;
  }

  toJSON() {
    return {
      rideId: this.rideId,
      lat: this.lat,
      lng: this.lng,
    };
  }
}
