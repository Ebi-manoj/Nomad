import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#444444',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: '100',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: '-100',
      },
      {
        visibility: 'off',
      },
      {
        lightness: '-100',
      },
      {
        color: '#ff0000',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text',
    stylers: [
      {
        saturation: '100',
      },
      {
        lightness: '100',
      },
      {
        weight: '0.01',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-87',
      },
      {
        saturation: '-100',
      },
      {
        hue: '#ff0079',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        saturation: '-100',
      },
      {
        lightness: '-100',
      },
      {
        gamma: '3.06',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dddddd',
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#c90a0a',
      },
    ],
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c23232',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#b60202',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b20a0a',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#b20000',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#160101',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#acaaaa',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#625d5d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        weight: '0.01',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f6d467',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.icon',
    stylers: [
      {
        lightness: '-2',
      },
      {
        saturation: '-11',
      },
      {
        gamma: '1.95',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d35252',
      },
    ],
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#81efdd',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#e7e7e7',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c6e6f0',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bcadad',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#e9ecf3',
      },
      {
        visibility: 'on',
      },
    ],
  },
];

interface MapComponentProps {
  center?: { lat: number; lng: number };
  markers?: { position: { lat: number; lng: number }; label?: string }[];
  zoom?: number;
  children?: React.ReactNode;
  onLoad?: (map: google.maps.Map) => void;
}

export const MapComponent = ({
  center,
  markers = [],
  zoom,
  children,
  onLoad,
}: MapComponentProps) => {
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 10.8505,
    lng: 76.2711,
  });
  const [defaultzoom, setDefaultZoom] = useState(7);

  useEffect(() => {
    if (center) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setDefaultCenter({ lat: latitude, lng: longitude });
        setDefaultZoom(15);
      });
    }
  }, []);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };
  return (
    <div className="w-full h-full outline-none border-none focus:outline-none">
      <GoogleMap
        center={center ?? defaultCenter}
        zoom={zoom ?? defaultzoom}
        mapContainerStyle={containerStyle}
        options={{ styles: mapStyle, disableDefaultUI: true }}
        onLoad={onLoad} // pass onLoad to GoogleMap
      >
        {markers.map((m, i) => (
          <Marker key={i} position={m.position} label={m.label} />
        ))}
        {children}
      </GoogleMap>
    </div>
  );
};
