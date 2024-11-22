import 'leaflet/dist/leaflet.css';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { useState } from 'react';
import { MapContainer, ZoomControl } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsChoropleth';
import VectorTileLayer from './VectorTileLayer';
import ZoomTracker from './ZoomTracker';

export default function Map({ countries, disputedAreas }: MapProps) {
  const { selectedMapType } = useSelectedMap();
  const [selectedCountryId, setSelectedCountryId] = useState<number | undefined>();
  const { setSelectedMapVisibility } = useSelectedMapVisibility();
  const { selectedAlert, toggleAlert } = useSelectedAlert();

  const onZoomThresholdReached = () => {
    setSelectedCountryId(undefined);
    setSelectedMapVisibility(true);
  };

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
      markerZoomAnimation={false}
      zoomAnimation={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <AlertContainer countries={countries} />
      {countries && <VectorTileLayer countries={countries} disputedAreas={disputedAreas} />}
      {selectedMapType === GlobalInsight.FOOD &&
        countries.features &&
        countries.features
          .filter((countryData) => countryData.properties.interactive)
          .filter((countryData) => countryData.properties.fcs !== null)
          .map((countryData) => (
            <FcsChoropleth
              key={countryData.properties.adm0_id}
              countryId={countryData.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [countryData as Feature<Geometry, GeoJsonProperties>] }}
              selectedCountryId={selectedCountryId}
              selectedAlert={selectedAlert}
              setSelectedCountryId={setSelectedCountryId}
              setSelectedMapVisibility={setSelectedMapVisibility}
              toggleAlert={toggleAlert}
            />
          ))}
      <ZoomTracker threshold={5} callback={onZoomThresholdReached} />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
