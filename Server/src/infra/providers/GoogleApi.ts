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
}
