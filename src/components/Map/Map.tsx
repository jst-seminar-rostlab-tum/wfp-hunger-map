import 'leaflet/dist/leaflet.css';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { MapContainer } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsChoropleth';
import IpcChoropleth from './IpcMap/IpcChoropleth';
import VectorTileLayer from './VectorTileLayer';
import ZoomControl from './ZoomControl';

export default function Map({ countries, disputedAreas, ipcData }: MapProps) {
  const { selectedMapType } = useSelectedMap();
  const { setSelectedMapVisibility } = useSelectedMapVisibility();
  const { selectedAlert, toggleAlert, resetAlert } = useSelectedAlert();
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();

  const onZoomThresholdReached = () => {
    setSelectedCountryId(null);
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
      {countries && <VectorTileLayer countries={countries} disputedAreas={disputedAreas} ipcData={ipcData} />}
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

      {selectedMapType === GlobalInsight.IPC && (
        <IpcChoropleth
          countries={countries}
          ipcData={ipcData}
          selectedCountryId={selectedCountryId}
          setSelectedCountryId={setSelectedCountryId}
          resetAlert={resetAlert}
        />
      )}

      <ZoomControl threshold={5} callback={onZoomThresholdReached} />
    </MapContainer>
  );
}
