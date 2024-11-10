import 'leaflet/dist/leaflet.css';

import { MapContainer, ZoomControl } from 'react-leaflet';

import { MapProps } from '@/domain/props/MapProps';

import VectorTileLayer from './VectorTileLayer';

export default function Map({ countries, disputedAreas }: MapProps) {
  return (
    <MapContainer
      center={[21.505, -0.09]}
      zoom={3}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={3}
      maxZoom={8}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      style={{ height: '100%', width: '100%', zIndex: 40 }}
    >
      <VectorTileLayer countries={countries} disputedAreas={disputedAreas} />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
