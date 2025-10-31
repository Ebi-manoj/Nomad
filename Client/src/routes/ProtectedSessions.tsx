import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

interface ProtectedSessionProps {
  children: React.ReactNode;
  requireActiveRide?: boolean;
  requireActiveHike?: boolean;
}

export const ProtectedSession = ({
  children,
  requireActiveRide = false,
  requireActiveHike = false,
}: ProtectedSessionProps) => {
  const location = useLocation();
  const { hikeData } = useSelector((state: RootState) => state.hike);
  const { rideData } = useSelector((state: RootState) => state.ride);

  // Redirect if user needs an active ridehike but doesnt have one
  if (requireActiveRide && !rideData) {
    return <Navigate to="/ride" state={{ from: location }} replace />;
  }

  if (requireActiveHike && !hikeData) {
    return <Navigate to="/hike" state={{ from: location }} replace />;
  }

  //  Redirect if user already has an active session
  if (!requireActiveRide && !requireActiveHike) {
    if (rideData && !location.pathname.startsWith('/ride/started')) {
      return <Navigate to="/ride/started" replace />;
    }
    if (hikeData && !location.pathname.startsWith('/hike/match')) {
      return <Navigate to="/hike/match" replace />;
    }
  }

  return <>{children}</>;
};
