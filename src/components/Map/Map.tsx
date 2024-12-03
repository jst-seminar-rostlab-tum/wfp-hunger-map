import 'leaflet/dist/leaflet.css';

import { Feature, FeatureCollection, GeoJSON, GeoJsonProperties, Geometry } from 'geojson';
import L, { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer } from 'react-leaflet';

import BackToGlobalButton from '@/components/Map/BackToGlobalButton';
import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
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

export default function Map({ countries, disputedAreas, ipcData, fcsData, nutritionData, alertData }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const { selectedMapType } = useSelectedMap();
  const { setSelectedMapVisibility } = useSelectedMapVisibility();
  const { resetAlert } = useSelectedAlert();
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { closeSidebar } = useSidebar();

  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [countryClickLoading, setCountryClickLoading] = useState<boolean>(false);
  const [regionNutritionData, setRegionNutritionData] = useState<CountryMimiData | undefined>();
  const [ipcRegionData, setIpcRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [selectedCountryName, setSelectedCountryName] = useState<string | undefined>(undefined);

  const onZoomThresholdReached = () => {
    setSelectedCountryId(null);
    setSelectedMapVisibility(true);
    MapOperations.resetSelectedCountryData(
      setRegionData,
      setCountryData,
      setCountryIso3Data,
      setRegionNutritionData,
      setIpcRegionData
    );
  };

  useEffect(() => {
    if (selectedCountryId) {
      setSelectedMapVisibility(
        selectedMapType === GlobalInsight.VEGETATION || selectedMapType === GlobalInsight.RAINFALL
      );
      closeSidebar();
      resetAlert();

      MapOperations.resetSelectedCountryData(
        setRegionData,
        setCountryData,
        setCountryIso3Data,
        setRegionNutritionData,
        setIpcRegionData
      );

      const selectedCountryData: CountryMapData | undefined = countries.features.find(
        (country) => country.properties.adm0_id === selectedCountryId
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
        setSelectedCountryName(selectedCountryData.properties.adm0_name);
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
      <AlertContainer countries={countries} alertData={alertData} />
      {countries && <VectorTileLayer countries={countries} disputedAreas={disputedAreas} />}
      {selectedMapType === GlobalInsight.FOOD &&
        countries.features &&
        countries.features
          .filter((country) => country.properties.interactive)
          .filter((country) => fcsData[country.properties.adm0_id]?.fcs)
          .map((country) => (
            <FcsChoropleth
              key={country.properties.adm0_id}
              countryId={country.properties.adm0_id}
              data={{ type: 'FeatureCollection', features: [country as Feature<Geometry, GeoJsonProperties>] }}
              selectedCountryId={selectedCountryId}
              setSelectedCountryId={setSelectedCountryId}
              loading={countryClickLoading}
              countryData={countryData}
              countryIso3Data={countryIso3Data}
              regionData={regionData}
              selectedCountryName={selectedCountryName}
            />
          ))}

      {selectedMapType === GlobalInsight.IPC && (
        <IpcChoropleth
          countries={countries}
          ipcData={ipcData}
          selectedCountryId={selectedCountryId}
          setSelectedCountryId={setSelectedCountryId}
          countryData={countryData}
          ipcRegionData={ipcRegionData}
          selectedCountryName={selectedCountryName}
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
              setSelectedCountryId={setSelectedCountryId}
              nutritionData={nutritionData}
              regionNutritionData={regionNutritionData}
              regionData={regionData}
              selectedCountryName={selectedCountryName}
            />
          ))}
      <ZoomControl threshold={5} callback={onZoomThresholdReached} />
      <BackToGlobalButton />
    </MapContainer>
  );
}
