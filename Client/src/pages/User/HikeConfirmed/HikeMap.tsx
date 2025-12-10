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

  //  Get hiker live location ()
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

  //  Fetch both direction routes
  useEffect(() => {
    const service = new google.maps.DirectionsService();

    //  Rider → Pickup (black)
    service.route(
      {
        origin: riderLocation,
        destination: pickup,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => status === 'OK' && setRiderToPickup(res)
    );

    //  Pickup → Destination (blue)
    service.route(
      {
        origin: pickup,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => status === 'OK' && setPickupToDest(res)
    );
  }, [riderLocation, pickup, destination]);
  console.log(currentPosition);
  if (!currentPosition)
    return (
      <>
        <div>Loading....</div>
      </>
    );
  //  Dotted line: Hiker current → Pickup
  const hikerPath = [currentPosition, pickup];

  return (
    <MapComponent key={bookingStatus} center={currentPosition} zoom={14}>
      {/* Rider Marker */}
      {bookingStatus == 'CONFIRMED' && (
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
      {bookingStatus == 'CONFIRMED' && riderToPickup && (
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
