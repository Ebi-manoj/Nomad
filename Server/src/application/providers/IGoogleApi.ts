export type Data = {
  lat: number;
  lng: number;
};

export interface IGoogleApi {
  getDistance(
    pickup: Data,
    destination: Data
  ): Promise<{ distance: number; duration: number }>;
  getRoute(pickup: Data, destination: Data): Promise<[number, number][]>;
}
