import 'leaflet/dist/leaflet.css';

import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { useState } from 'react';
import { MapContainer } from 'react-leaflet';

import { MAP_MAX_ZOOM, MAP_MIN_ZOOM } from '@/domain/constant/map/Map';
import { useSelectedCountry } from '@/domain/contexts/SelectedCountryContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSelectedMapVisibility } from '@/domain/contexts/SelectedMapVisibilityContext';
import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { MapProps } from '@/domain/props/MapProps';

import { AlertContainer } from './Alerts/AlertContainer';
import FcsChoropleth from './FcsChoropleth';
import NutritionChoropleth from './NutritionChoropleth';
import VectorTileLayer from './VectorTileLayer';
import ZoomControl from './ZoomControl';

export default function Map({ countries, disputedAreas, ipcData, nutritionData }: MapProps) {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const { selectedMapType } = useSelectedMap();
  const { setSelectedMapVisibility } = useSelectedMapVisibility();
  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [regionNutritionData, setRegionNutritionData] = useState<CountryMimiData | undefined>();
  const [countryDataLoading, setCountryDataLoading] = useState<boolean>(false);

  const onZoomThresholdReached = () => {
    setSelectedCountry(null);
    setSelectedMapVisibility(true);
    setCountryData(undefined);
    setRegionData(undefined);
    setCountryIso3Data(undefined);
    setRegionNutritionData(undefined);
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
      zoomSnap={0}
      wheelPxPerZoomLevel={50}
    >
      <AlertContainer countries={countries} />
      {countries && (
        <VectorTileLayer
          countries={countries}
          disputedAreas={disputedAreas}
          ipcData={ipcData}
          nutritionData={nutritionData}
          setCountryData={setCountryData}
          setCountryIso3Data={setCountryIso3Data}
          setRegionData={setRegionData}
          setRegionNutritionData={setRegionNutritionData}
          setCountryDataLoading={setCountryDataLoading}
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
              selectedCountryId={selectedCountry?.properties.adm0_id}
              countryData={countryData}
              countryIso3Data={countryIso3Data}
              regionData={regionData}
              countryDataLoading={countryDataLoading}
            />
          ))}
      {selectedMapType === GlobalInsight.NUTRITION &&
        countries.features &&
        countries.features
          .filter((country) => country.properties.interactive)
          .map((country) => (
            <NutritionChoropleth
              key={country.properties.adm0_id}
              countryId={country.properties.adm0_id}
              selectedCountryId={selectedCountry?.properties.adm0_id}
              regionData={regionData}
              regionNutritionData={regionNutritionData}
            />
          ))}
      <ZoomControl threshold={5} callback={onZoomThresholdReached} />
    </MapContainer>
  );
}
