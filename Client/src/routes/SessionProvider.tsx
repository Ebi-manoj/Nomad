import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { RootState } from '@/store/store';
import { getActiveSession } from '@/api/session';
import { setActiveHike } from '@/store/features/user/hike/hikeSlice';
import { setActiveRide } from '@/store/features/user/ride/rideSlice';
import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton';

export const ActiveSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const { hikeData } = useSelector((state: RootState) => state.hike);
  const { rideData } = useSelector((state: RootState) => state.ride);

  const checkActiveSession = useCallback(async () => {
    try {
      const data = await getActiveSession();
      const { activeRide, activeHike } = data;

      if (activeHike) dispatch(setActiveHike(activeHike));
      if (activeRide) dispatch(setActiveRide(activeRide));
    } catch (error) {
      console.error('Failed to fetch active session:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!rideData && !hikeData) {
      checkActiveSession();
    } else {
      setLoading(false);
    }
  }, [rideData, hikeData, checkActiveSession]);

  if (loading) return <HomeSkeleton />;

  return <>{children}</>;
};
