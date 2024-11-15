import 'leaflet/dist/leaflet.css';

import { MapContainer, ZoomControl } from 'react-leaflet';

import nutrition from '@/app/Nutrition/nutrition.json';
import NutritionChoropleth from '@/app/Nutrition/NutritionLayer';
import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/Map';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
import VectorTileLayer from './VectorTileLayer';

export default function Map({ countries, disputedAreas }: MapProps) {
  const { selectedMapType } = useSidebar();
  const nutritionIso3cODES = new Set(nutrition.nutrition.map((item) => item.iso3));
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
          .map((c) =>
            nutritionIso3cODES.has(c.properties.iso3) ? (
              <NutritionChoropleth
                key={c.properties.adm0_id}
                data={c}
                view="nutritionOverview"
                style={() => ({
                  color: '#fff',
                  weight: 1,
                  fillOpacity: 0.5,
                  fillColor: '#C4841D',
                })}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(feature.properties.adm0_name, { sticky: true });
                }}
              />
            ) : null
          )}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
