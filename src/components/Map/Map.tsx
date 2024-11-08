'use client';

import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import { MapProps } from '@/domain/props/MapProps';

import { CountryPolygon } from './CountryPolygon';

export default function Map({ countries }: MapProps) {
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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {countries.features
        .filter((c) => c.properties.interactive)
        .map((c) => (
          // TODO fix the layout, this is just an example
          <CountryPolygon country={c} key={c.properties.adm0_id} />
        ))}
    </MapContainer>
  );
}
