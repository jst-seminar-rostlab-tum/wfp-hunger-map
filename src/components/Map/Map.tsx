import 'leaflet/dist/leaflet.css';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { useEffect, useState } from 'react';
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
  const [countryStyles, setCountryStyles] = useState<{ [key: number]: L.PathOptions }>({});
  const getFillColor = (dataType: string): string => {
    switch (dataType) {
      case 'actual':
        return '#FFB74D';
      case 'predicted':
        return '#E3F2FD';
      default:
        return '#52525b';
    }
  };

  // Fetch and preprocess data
  useEffect(() => {
    GlobalRepo.getNutritionData()
      .then((global) => {
        if (global && Array.isArray(global.body)) {
          const styles = global.body.reduce(
            (acc, item) => {
              acc[item.adm0_code] = {
                color: '#fff',
                weight: 1,
                fillOpacity: 0.5,
                fillColor: getFillColor(item.data_type),
              };
              return acc;
            },
            {} as { [key: number]: L.PathOptions }
          );

          setCountryStyles(styles);
        } else {
          console.error('Expected an array in global.body');
        }
      })
      .catch((error) => {
        console.error('Error fetching nutrition data:', error);
      });
  }, []);

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
            const style = countryStyles[c.properties.adm0_id];

            return style ? (
              <NutritionChoropleth
                key={c.properties.adm0_id}
                data={{ type: 'FeatureCollection', features: [c as Feature<Geometry, GeoJsonProperties>] }}
                style={style}
                handleClick={(sourceTarget) => {
                  console.log('Country clicked:', sourceTarget);
                }}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(feature?.properties?.adm0_name, { sticky: true });
                }}
              />
            ) : null;
          })}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
