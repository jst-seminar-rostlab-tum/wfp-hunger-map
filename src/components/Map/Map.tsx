'use client';

import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer } from 'react-leaflet';

import NutritionChloropleth from '@/app/Nutrition/NutritionLayer.js';
import { MapProps } from '@/domain/props/MapProps';

export default function Map({ countries }: MapProps) {
  return (
    <MapContainer center={[21.505, -0.09]} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countries.features
        .filter((c) => c.properties.interactive)
        .map((c) => (
          // Only render NutritionChloropleth if country ISO3 is in nutritionIso3Codes
          <NutritionChloropleth
            key={c.properties.adm0_id} // Unique key for each country (assuming adm0_id is unique)
            data={c} // Pass the country GeoJSON feature data
            selectedNutritionView="nutritionOverview" // Specify the nutrition view
            view="nutritionOverview" // Specify which type of nutrition view to display
            style={() => ({
              color: '#fff', // Style for the country polygons
              weight: 1,
              fillOpacity: 0.5,
              fillColor: '#f32e27', // Example color, can be dynamic
            })}
            handleClick={(sourceTarget) => {
              console.log('Country clicked:', sourceTarget);
            }}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(feature.properties.adm0_name, { sticky: true });
            }}
            onFeatureMouseOver={() => {}}
          />
        ))}
    </MapContainer>
  );
}
