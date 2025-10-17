type data = {
  lat: number;
  lng: number;
};

export interface IGoogleApi {
  getDistance(pickup: data, destination: data): number;
}
