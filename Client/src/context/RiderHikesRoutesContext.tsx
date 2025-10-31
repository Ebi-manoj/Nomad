import { createContext, useContext, useState, type ReactNode } from 'react';

interface RouteData {
  pickup: { lat: number; lng: number };
  dropoff: { lat: number; lng: number };
}

interface RideRouteContextType {
  selectedRoute: RouteData | null;
  isRouteVisible: boolean;
  showRoute: (route: RouteData) => void;
  hideRoute: () => void;
}

const RideRouteContext = createContext<RideRouteContextType | undefined>(
  undefined
);

export const RideRouteProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [isRouteVisible, setIsRouteVisible] = useState(false);

  const showRoute = (route: RouteData) => {
    setSelectedRoute(route);
    setIsRouteVisible(true);
  };

  const hideRoute = () => {
    setSelectedRoute(null);
    setIsRouteVisible(false);
  };

  return (
    <RideRouteContext.Provider
      value={{ selectedRoute, isRouteVisible, showRoute, hideRoute }}
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
