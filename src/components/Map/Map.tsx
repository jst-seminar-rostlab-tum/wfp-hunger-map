import 'leaflet/dist/leaflet.css';

import { MapContainer, ZoomControl } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/Map';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
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
      minZoom={MAP_MIN_ZOOM}
      maxZoom={MAP_MAX_ZOOM}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
      zoomSnap={0}
      wheelPxPerZoomLevel={2}
    >
      <AlertContainer />
      {countries && <VectorTileLayer countries={countries} disputedAreas={disputedAreas} />}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
