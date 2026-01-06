import type { ReactElement } from 'react';
import { LoadScriptNext } from '@react-google-maps/api';

const libraries: Array<'places' | 'marker'> = ['places', 'marker'];

export const GoogleApiWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<></>}
    >
      <>{children}</>
    </LoadScriptNext>
  );
};
