import 'leaflet/dist/leaflet.css';

import { Feature, FeatureCollection, GeoJSON, GeoJsonProperties, Geometry } from 'geojson';
import L, { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';
import { MapOperations } from '@/operations/map/MapOperations.ts';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsChoropleth';
import IpcChoropleth from './IpcMap/IpcChoropleth';
import NutritionChoropleth from './NutritionChoropleth';
import VectorTileLayer from './VectorTileLayer';
import ZoomControl from './ZoomControl';

export default function Map({ countries, disputedAreas, ipcData, nutritionData }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const { selectedMapType } = useSelectedMap();
  const { setSelectedMapVisibility } = useSelectedMapVisibility();
  const { selectedAlert, toggleAlert, resetAlert } = useSelectedAlert();
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();

  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [countryClickLoading, setCountryClickLoading] = useState<boolean>(false);
  const [regionNutritionData, setRegionNutritionData] = useState<CountryMimiData | undefined>();
  const [ipcRegionData, setIpcRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();

  const onZoomThresholdReached = () => {
    setSelectedCountryId(null);
    setSelectedMapVisibility(true);
    setCountryData(undefined);
    setRegionData(undefined);
    setCountryIso3Data(undefined);
    setRegionNutritionData(undefined);
    setIpcRegionData(undefined);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountryData: CountryMapData | undefined = countries.features.find(
        (country) => country.properties.adm0_id === Number(selectedCountryId)
      );
      if (selectedCountryData) {
        MapOperations.fetchCountryData(
          selectedMapType,
          selectedCountryData,
          setCountryClickLoading,
          setRegionData,
          setCountryData,
          setCountryIso3Data,
          setRegionNutritionData,
          setIpcRegionData
        );
        mapRef.current?.fitBounds(L.geoJSON(selectedCountryData as GeoJSON).getBounds(), { animate: true });
      }
    }
  }, [selectedCountryId, selectedMapType]);

  return (
    <MapContainer
      ref={mapRef}
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
      {countries && (
        <VectorTileLayer
          countries={countries}
          disputedAreas={disputedAreas}
          ipcData={ipcData}
          nutritionData={nutritionData}
        />
      )}
      {selectedMapType === GlobalInsight.FOOD &&
        countries.features &&
        countries.features
          .filter((country) => country.properties.interactive)
          .filter((country) => country.properties.fcs !== null)
          .map((country) => (
            <FcsChoropleth
              key={country.properties.adm0_id}
              countryId={country.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [country as Feature<Geometry, GeoJsonProperties>] }}
              selectedCountryId={selectedCountryId}
              selectedAlert={selectedAlert}
              setSelectedCountryId={setSelectedCountryId}
              setSelectedMapVisibility={setSelectedMapVisibility}
              toggleAlert={toggleAlert}
              loading={countryClickLoading}
              countryData={countryData}
              countryIso3Data={countryIso3Data}
              regionData={regionData}
            />
          ))}

      {selectedMapType === GlobalInsight.IPC && (
        <IpcChoropleth
          countries={countries}
          ipcData={ipcData}
          selectedCountryId={selectedCountryId}
          setSelectedCountryId={setSelectedCountryId}
          resetAlert={resetAlert}
          countryData={countryData}
          ipcRegionData={ipcRegionData}
        />
      )}

      {selectedMapType === GlobalInsight.NUTRITION &&
        countries.features &&
        countries.features
          .filter((country) => country.properties.interactive)
          .map((country) => (
            <NutritionChoropleth
              key={country.properties.adm0_id}
              countryId={country.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [country as Feature<Geometry, GeoJsonProperties>] }}
              selectedCountryId={selectedCountryId}
              selectedAlert={selectedAlert}
              setSelectedCountryId={setSelectedCountryId}
              toggleAlert={toggleAlert}
              nutritionData={nutritionData}
              regionNutritionData={regionNutritionData}
              regionData={regionData}
            />
          ))}
      <ZoomControl threshold={5} callback={onZoomThresholdReached} />
    </MapContainer>
  );
}
