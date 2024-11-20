import 'leaflet/dist/leaflet.css';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { useState } from 'react';
import { MapContainer, ZoomControl } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map.ts';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsChoropleth';
import VectorTileLayer from './VectorTileLayer';

export default function Map({ countries, disputedAreas }: MapProps) {
  const { selectedMapType } = useSelectedMap();
  const [selectedCountryId, setSelectedCountryId] = useState<number | undefined>();

  const countryStyle: L.PathOptions = {
    color: undefined,
  };

  return (
    <MapContainer
      center={[21.505, -0.09]}
      zoom={3}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={2}
      maxZoom={18}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      markerZoomAnimation={false}
      zoomAnimation={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <AlertContainer />
      {countries && <VectorTileLayer countries={countries} disputedAreas={disputedAreas} />}
      {selectedMapType === GlobalInsight.FOOD &&
        countries.features
          .filter((countryData) => countryData.properties.interactive)
          .map((countryData) => (
            <FcsChoropleth
              key={countryData.properties.adm0_id}
              countryId={countryData.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [countryData as Feature<Geometry, GeoJsonProperties>] }}
              style={countryStyle}
              selectedCountryId={selectedCountryId}
              setSelectedCountryId={setSelectedCountryId}
            />
          ))}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
