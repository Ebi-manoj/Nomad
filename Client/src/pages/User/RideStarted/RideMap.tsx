import { MapComponent } from '@/components/MapComponent';
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
  console.log(directions);
  const { riderSocket } = useSocket();

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
    </MapComponent>
  );
};
