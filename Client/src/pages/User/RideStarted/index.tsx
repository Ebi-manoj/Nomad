import { RideRouteProvider } from '@/context/RiderHikesRoutesContext';
import { RideStartedContent } from './RideStarted';


export function RideStarted() {
  return (
    <RideRouteProvider>
      <RideStartedContent />
    </RideRouteProvider>
  );
}
