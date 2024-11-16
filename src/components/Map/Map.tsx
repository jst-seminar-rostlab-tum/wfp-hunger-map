import 'leaflet/dist/leaflet.css';

import { useState } from 'react';
import { MapContainer, ZoomControl } from 'react-leaflet';

import NutritionChoropleth from '@/app/Nutrition/NutritionLayer';
import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/Map';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';
import GlobalDataRepositoryImpl from '@/infrastructure/repositories/GlobalDataRepositoryImpl';

import { AlertContainer } from './Alerts/AlertContainer';
import VectorTileLayer from './VectorTileLayer';

export default function Map({ countries, disputedAreas }: MapProps) {
  const { selectedMapType } = useSidebar();
  const GlobalRepo = new GlobalDataRepositoryImpl();
  const [adm0Codes, setAdm0Codes] = useState<number[]>([]);
  GlobalRepo.getNutritionData()
    .then((global) => {
      if (global && Array.isArray(global.body)) {
        const Codes = global.body.map((item) => item.adm0_code);
        setAdm0Codes(Codes);
        console.log(Codes);
      } else {
        console.error('Expected an array in global.body');
      }
    })
    .catch((error) => {
      console.error('Error fetching nutrition data:', error);
    });
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
    >
      <AlertContainer />
      {countries && <VectorTileLayer countries={countries} disputedAreas={disputedAreas} />}
      {selectedMapType === GlobalInsight.NUTRITION &&
        countries.features
          .filter((c) => c.properties.interactive)
          .map((c) => {
            const isCodeInArray = adm0Codes.includes(c.properties.adm0_id);

            return isCodeInArray ? (
              <NutritionChoropleth
                key={c.properties.adm0_id}
                data={c}
                view="nutritionOverview"
                style={() => ({
                  color: '#fff',
                  weight: 1,
                  fillOpacity: 0.5,
                  fillColor: '#f5a524',
                })}
                handleClick={(sourceTarget) => {
                  console.log('Country clicked:', sourceTarget);
                }}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(feature.properties.adm0_name, { sticky: true });
                }}
                onFeatureMouseOver={() => {}}
              />
            ) : null;
          })}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
