import { MapComponent } from '@/components/MapComponent';
import { useSocket } from '@/hooks/sockets/useSockets';
import { DirectionsRenderer, OverlayView } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { FaMotorcycle } from 'react-icons/fa6';
import { FaMapPin } from 'react-icons/fa6';
interface RideMapProps {
  pickup: string;
  destination: string;
}

export const RideMap = ({ pickup, destination }: RideMapProps) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 10.8505, lng: 76.2711 });
  navigator.geolocation.getCurrentPosition(console.log, console.error);

  const riderSocket = useSocket('/rider');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }

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

  console.log(directions?.routes[0].overview_path);

  return (
    <MapComponent center={currentPosition} zoom={15}>
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
          }}
        />
      )}
      <OverlayView
        position={startPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className="w-5 h-5 rounded-full bg-black border-2 border-white shadow-md" />
      </OverlayView>

      {/* Destination Marker */}
      <OverlayView
        position={endPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className="w-6 h-6 relative text-red-500 text-2xl">
          <FaMapPin />
        </div>
      </OverlayView>

      {/* Rider Marker */}
      <OverlayView
        position={currentPosition}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className="text-black text-3xl drop-shadow-lg">
          <FaMotorcycle />
        </div>
      </OverlayView>
    </MapComponent>
  );
};
