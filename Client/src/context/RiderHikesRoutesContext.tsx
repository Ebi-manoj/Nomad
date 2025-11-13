import { createContext, useContext, useState, type ReactNode } from 'react';

interface RouteData {
  pickup?: { lat: number; lng: number };
  dropoff?: { lat: number; lng: number };
}

interface RideRouteContextType {
  selectedRoute: RouteData | null;
  selectedHikerId: string | null;
  showRoute: (route: RouteData, hikeId: string) => void;
  hideRoute: () => void;
}

const RideRouteContext = createContext<RideRouteContextType | undefined>(
  undefined
);

export const RideRouteProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [selectedHikerId, setSelectedHikerId] = useState<string | null>(null);

  const showRoute = (route: RouteData, hikeId: string) => {
    setSelectedRoute(route);
    setSelectedHikerId(hikeId);
  };

  const hideRoute = () => {
    setSelectedRoute(null);
    setSelectedHikerId(null);
  };

  return (
    <RideRouteContext.Provider
      value={{ selectedRoute, selectedHikerId, showRoute, hideRoute }}
    >
      {children}
    </RideRouteContext.Provider>
  );
};

export const useRideRoute = () => {
  const context = useContext(RideRouteContext);
  if (!context) {
    throw new Error('useRideRoute must be used inside RideRouteProvider');
  }
  return context;
};
