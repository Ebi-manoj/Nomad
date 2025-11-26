export interface ILocationResolver {
  resolveLocation(
    providedLocation: { lat: number; lng: number } | undefined,
    rideId: string
  ): Promise<GeoJSON.Point>;
}
