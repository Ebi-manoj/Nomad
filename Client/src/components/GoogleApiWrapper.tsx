import type { ReactNode } from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries: 'places'[] = ['places'];
export const GoogleApiWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};
