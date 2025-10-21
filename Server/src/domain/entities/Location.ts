export interface LocationProps {
  userId: string;
  lat: number;
  lng: number;
}

export class Location {
  public readonly userId;
  public readonly lat;
  public readonly lng;
  constructor(props: LocationProps) {
    this.userId = props.userId;
    this.lat = props.lat;
    this.lng = props.lng;
  }

  toJSON() {
    return {
      userId: this.userId,
      lat: this.lat,
      lng: this.lng,
    };
  }
}
