import { useEffect, useState } from 'react';
import { Marker, Polyline } from '@react-google-maps/api';
import { MapComponent } from '@/components/MapComponent';
import type { RideBookingStatus } from '@/store/features/user/rideBooking/rideBooking';

interface HikeStartedMapProps {
  riderLocation: google.maps.LatLngLiteral;
  pickup: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  bookingStatus: RideBookingStatus;
}

export const HikeStartedMap = ({
  riderLocation,
  pickup,
  destination,
  bookingStatus,
}: HikeStartedMapProps) => {
  const [riderToPickup, setRiderToPickup] =
    useState<google.maps.DirectionsResult | null>(null);
  const [pickupToDest, setPickupToDest] =
    useState<google.maps.DirectionsResult | null>(null);
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Get hiker live location with better error handling
  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLoadingLocation(false);
      // Fallback to pickup location
      setCurrentPosition(pickup);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      pos => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      err => {
        console.error('Geolocation error:', err);
        setIsLoadingLocation(false);
        setCurrentPosition(pickup);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 5000,
      }
    );

    // Cleanup: stop watching position when component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, [pickup]);

  // Fetch both direction routes
  useEffect(() => {
    if (!currentPosition) return;

    const service = new google.maps.DirectionsService();

    // Rider → Pickup (black)
    service.route(
      {
        origin: riderLocation,
        destination: pickup,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => status === 'OK' && setRiderToPickup(res)
    );

    // Pickup → Destination (blue)
    service.route(
      {
        origin: pickup,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => status === 'OK' && setPickupToDest(res)
    );
  }, [riderLocation, pickup, destination, currentPosition]);

  // Show loading state
  if (isLoadingLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  if (!currentPosition) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>Unable to load map</div>
      </div>
    );
  }

  // Dotted line: Hiker current → Pickup
  const hikerPath = [currentPosition, pickup];

  return (
    <MapComponent key={bookingStatus} center={currentPosition} zoom={14}>
      {/* Rider Marker */}
      {bookingStatus === 'CONFIRMED' && (
        <Marker
          position={riderLocation}
          icon={{
            url: '/motorcycle-icon.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      )}

      {/* Hiker Marker */}
      <Marker
        position={currentPosition}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#2563eb',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
      />

      {/* Pickup Marker */}
      <Marker
        position={pickup}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#22c55e',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
      />

      {/* Destination Marker */}
      <Marker
        position={destination}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
      />

      {/* Rider → Pickup (black line) */}
      {bookingStatus === 'CONFIRMED' && riderToPickup && (
        <Polyline
          path={riderToPickup.routes[0].overview_path}
          options={{
            strokeColor: 'black',
            strokeOpacity: 0.9,
            strokeWeight: 4,
          }}
        />
      )}

      {/* Pickup → Destination (blue line) */}
      {pickupToDest && (
        <Polyline
          path={pickupToDest.routes[0].overview_path}
          options={{
            strokeColor: '#2563eb',
            strokeOpacity: 0.9,
            strokeWeight: 4,
          }}
        />
      )}

      {/* Hiker current → Pickup (dotted gray) */}
      {bookingStatus === 'CONFIRMED' && (
        <Polyline
          path={hikerPath}
          options={{
            strokeOpacity: 0,
            strokeWeight: 0,
            strokeColor: 'transparent',
            icons: [
              {
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: '#ef4444',
                  fillOpacity: 1,
                  strokeColor: '#ef4444',
                  strokeOpacity: 1,
                  strokeWeight: 1,
                  scale: 2.5,
                },
                offset: '0',
                repeat: '12px',
              },
            ],
          }}
        />
      )}
    </MapComponent>
  );
};
