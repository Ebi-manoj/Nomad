import axios from 'axios';
import { Data, IGoogleApi } from '../../application/providers/IGoogleApi';
import { env } from '../utils/env';

export class GoogleApiService implements IGoogleApi {
  async getDistance(pickup: Data, destination: Data): Promise<number> {
    console.log(pickup, destination);

    const apiKey = env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${apiKey}`;

    try {
      const response = await axios.get(url);

      const data = response.data;

      if (
        data.routes &&
        data.routes.length > 0 &&
        data.routes[0].legs &&
        data.routes[0].legs.length > 0
      ) {
        const distanceMeters = data.routes[0].legs[0].distance.value;
        const distanceKm = distanceMeters / 1000;
        return distanceKm;
      }

      throw new Error('No route found');
    } catch (error: any) {
      console.error('Google API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch distance');
    }
  }
  async getRoute(pickup: Data, destination: Data): Promise<[number, number][]> {
    const apiKey = env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (
        data.routes &&
        data.routes.length > 0 &&
        data.routes[0].overview_polyline
      ) {
        const encodedPolyline = data.routes[0].overview_polyline.points;
        const decodedRoute = this.decodePolyline(encodedPolyline);
        return decodedRoute;
      }

      throw new Error('No route found');
    } catch (error: any) {
      console.error('Google API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch route');
    }
  }

  private decodePolyline(encoded: string): [number, number][] {
    let points: [number, number][] = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push([lng / 1e5, lat / 1e5]);
    }

    return points;
  }
}
