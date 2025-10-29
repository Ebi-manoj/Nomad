import { MapComponent } from '@/components/MapComponent';
import type { HikeResponseDTO } from '@/store/features/user/hike/hike';
import type { RideMatchResponseDTO } from '@/types/hike';
import { Polyline, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

type MatchRideMapProps = {
  hike: HikeResponseDTO;
  selectedRide: RideMatchResponseDTO | null;
};

export function MatchRideMap({ hike, selectedRide }: MatchRideMapProps) {
  const [hikerDirections, setHikerDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [riderDirections, setRiderDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // Parse coordinates
  const hikePickup = useMemo(
    () => ({
      lat: hike.pickup.coordinates[0],
      lng: hike.pickup.coordinates[1],
    }),
    [hike]
  );

  const hikeDestination = useMemo(
    () => ({
      lat: hike.destination.coordinates[0],
      lng: hike.destination.coordinates[1],
    }),
    [hike]
  );

  const riderPickup = useMemo(() => {
    if (!selectedRide) return null;
    return {
      lat: selectedRide.rideStartLocation.coordinates[0],
      lng: selectedRide.rideStartLocation.coordinates[1],
    };
  }, [selectedRide]);

  const riderDestination = useMemo(() => {
    if (!selectedRide) return null;
    return {
      lat: selectedRide.rideEndLocation.coordinates[0],
      lng: selectedRide.rideEndLocation.coordinates[1],
    };
  }, [selectedRide]);

  const nearestPickup = useMemo(() => {
    if (!selectedRide) return null;
    return {
      lat: selectedRide.nearestPickup.coordinates[1],
      lng: selectedRide.nearestPickup.coordinates[0],
    };
  }, [selectedRide]);

  const nearestDestination = useMemo(() => {
    if (!selectedRide) return null;
    return {
      lat: selectedRide.nearestDestination.coordinates[1],
      lng: selectedRide.nearestDestination.coordinates[0],
    };
  }, [selectedRide]);

  const riderCurrentLocation = useMemo(() => {
    if (!selectedRide || !selectedRide.currentRiderLocation) return null;
    return {
      lat: selectedRide.currentRiderLocation.coordinates[1],
      lng: selectedRide.currentRiderLocation.coordinates[0],
    };
  }, [selectedRide]);

  // Fetch hiker directions on mount
  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: hikePickup,
        destination: hikeDestination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setHikerDirections(result);
        } else {
          console.error('Hiker directions request failed:', status);
        }
      }
    );
  }, [hikePickup, hikeDestination]);

  // Fetch rider directions when selectedRide changes
  useEffect(() => {
    if (!selectedRide || !riderPickup || !riderDestination) {
      setRiderDirections(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: riderPickup,
        destination: riderDestination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setRiderDirections(result);
        } else {
          console.error('Rider directions request failed:', status);
        }
      }
    );
  }, [selectedRide, riderPickup, riderDestination]);

  // Dotted helper lines
  const dottedPickup = useMemo(() => {
    if (!selectedRide || !nearestPickup) return [];
    return [hikePickup, nearestPickup];
  }, [selectedRide, hikePickup, nearestPickup]);

  const dottedDestination = useMemo(() => {
    if (!selectedRide || !nearestDestination) return [];
    return [nearestDestination, hikeDestination];
  }, [selectedRide, nearestDestination, hikeDestination]);

  return (
    <MapComponent center={hikePickup}>
      {/* Rider Route (Black) - Only when selectedRide exists */}
      {selectedRide && riderDirections && (
        <DirectionsRenderer
          directions={riderDirections}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#000',
              strokeWeight: 4,
              strokeOpacity: 0.9,
            },
          }}
        />
      )}
      {/* Hiker Route (Blue) - Always visible */}
      {hikerDirections && (
        <DirectionsRenderer
          directions={hikerDirections}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#2563eb',
              strokeWeight: 4,
              strokeOpacity: 0.8,
            },
          }}
        />
      )}

      {/* Red Dotted Lines */}
      {selectedRide && (
        <>
          <Polyline
            path={dottedPickup}
            options={{
              strokeOpacity: 0,
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

          <Polyline
            path={dottedDestination}
            options={{
              strokeOpacity: 0,
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
        </>
      )}

      {/* Hiker Pickup Marker - White Circle */}
      <Marker
        position={hikePickup}
        label={{
          text: 'P',
          color: '#2563eb',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#ffffff',
          fillOpacity: 1,
          strokeWeight: 3,
          strokeColor: '#2563eb',
          scale: 10,
        }}
      />

      {/* Hiker Destination Marker - Red Circle */}
      <Marker
        position={hikeDestination}
        label={{
          text: 'D',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeWeight: 3,
          strokeColor: '#ffffff',
          scale: 10,
        }}
      />

      {/* Rider Pickup Marker with departure time bubble */}
      {selectedRide && nearestPickup && (
        <Marker
          position={nearestPickup}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 80 50">
                <!-- Speech bubble -->
                <rect x="5" y="5" width="70" height="30" rx="6" fill="#1f2937" stroke="#ffffff" stroke-width="2"/>
                <polygon points="25,35 20,42 30,35" fill="#1f2937" stroke="#ffffff" stroke-width="2" stroke-linejoin="miter"/>
                
                <!-- Text -->
                <text x="40" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">
                  ${selectedRide.departure} min
                </text>
                
                <!-- Marker circle -->
                <circle cx="25" cy="42" r="8" fill="#1f2937" stroke="#ffffff" stroke-width="2.5"/>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(80, 50),
            anchor: new google.maps.Point(25, 42),
          }}
        />
      )}

      {/* Rider Destination Marker - Orange Circle */}
      {selectedRide && nearestDestination && (
        <Marker
          position={nearestDestination}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#f97316',
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: '#ffffff',
            scale: 10,
          }}
        />
      )}
      {selectedRide && riderCurrentLocation && (
        <Marker
          position={riderCurrentLocation}
          icon={{
            url:
              selectedRide.user.vehicleType === 'car'
                ? '/car-icon.png'
                : '/motorcycle-icon.png',
            scaledSize: new google.maps.Size(25, 25),
            anchor: new google.maps.Point(20, 20),
          }}
        />
      )}
    </MapComponent>
  );
}
