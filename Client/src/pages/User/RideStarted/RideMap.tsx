import { MapComponent } from '@/components/MapComponent';
import { useRideRoute } from '@/context/RiderHikesRoutesContext';
import { useSocket } from '@/context/SocketContext';
import { DirectionsRenderer, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface RideMapProps {
  pickup: string;
  destination: string;
  rideId: string;
}
export const RideMap = ({ pickup, destination, rideId }: RideMapProps) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 10.8505,
    lng: 76.2711,
  });

  const { riderSocket } = useSocket();
  const { selectedRoute } = useRideRoute();

  useEffect(() => {
    if (!riderSocket.connected) {
      riderSocket.connect();
    }
    riderSocket.emit('ride:join', rideId);

    return () => {
      // Cleanup listeners
      riderSocket.off('join-request:new');
    };
  }, [rideId, riderSocket]);

  // Get current position once
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      pos => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      err => console.error(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Get directions
  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) setDirections(result);
      }
    );
  }, [pickup, destination]);

  // Simulate movement
  useEffect(() => {
    if (!directions) return;
    const routePath = directions.routes[0].overview_path;
    let index = 0;

    const simulator = setInterval(() => {
      if (index >= routePath.length) return clearInterval(simulator);
      const point = routePath[index];
      setCurrentPosition({ lat: point.lat(), lng: point.lng() });
      index++;
    }, 5000);

    return () => clearInterval(simulator);
  }, [directions]);

  //  location to backend
  useEffect(() => {
    riderSocket?.emit('location:update', { rideId, ...currentPosition });
  }, [currentPosition, riderSocket, rideId]);

  const startPos = directions
    ? {
        lat: directions.routes[0].legs[0].start_location.lat(),
        lng: directions.routes[0].legs[0].start_location.lng(),
      }
    : currentPosition;

  const endPos = directions
    ? {
        lat: directions.routes[0].legs[0].end_location.lat(),
        lng: directions.routes[0].legs[0].end_location.lng(),
      }
    : currentPosition;
  const createLabeledMarker = (
    label: string,
    bgColor: string,
    textColor: string = 'white'
  ) => {
    const labelWidth = label.length * 7 + 20; // text bubble width
    const totalWidth = 30 + labelWidth + 10; // total marker width

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${totalWidth}"
           height="60"
           viewBox="0 0 ${totalWidth} 60">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5"
              flood-color="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        <!-- Marker pin -->
        <path d="M20 5
                 a15 15 0 0 1 15 15
                 c0 10-15 25-15 25S5 30 5 20
                 a15 15 0 0 1 15-15z"
              fill="${bgColor}"
              stroke="white"
              stroke-width="2"
              filter="url(#shadow)"/>

        <!-- Inner circle -->
        <circle cx="20" cy="20" r="5" fill="white"/>

        <!-- Label background -->
        <rect x="45" y="12" width="${labelWidth}" height="18" rx="9"
              fill="${bgColor}" opacity="0.95"/>

        <!-- Label text -->
        <text x="${45 + labelWidth / 2}" y="25"
              font-family="Arial, sans-serif"
              font-size="11"
              font-weight="600"
              fill="${textColor}"
              text-anchor="middle">${label}</text>
      </svg>
    `)}`,
      scaledSize: new google.maps.Size(totalWidth * 0.7, 45),
      anchor: new google.maps.Point(20, 40),
    };
  };

  return (
    <MapComponent center={currentPosition} zoom={15}>
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />
      )}

      {/* Start Marker */}
      <Marker
        position={startPos}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: 'black',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
      />

      {/* End Marker */}
      <Marker
        position={endPos}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'red',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
      />

      {/* Rider Marker */}
      <Marker
        position={currentPosition}
        icon={{
          url: '/motorcycle-icon.png',
          scaledSize: new google.maps.Size(40, 40),
        }}
      />

      {/* Hiker Pickup Marker with Label */}
      {selectedRoute && selectedRoute?.pickup && (
        <Marker
          position={selectedRoute.pickup}
          icon={createLabeledMarker('Pickup', '#22c55e')}
          zIndex={1000}
        />
      )}

      {/* Hiker Dropoff Marker with Label */}
      {selectedRoute && selectedRoute?.dropoff && (
        <Marker
          position={selectedRoute.dropoff}
          icon={createLabeledMarker('Destination', '#ef4444')}
          zIndex={1000}
        />
      )}
    </MapComponent>
  );
};
