import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';

import FscCountryChoropleth from './FcsCountryChoropleth';

export default function FcsChoropleth({
  data,
  countryId,
  selectedCountryId,
  selectedAlert,
  setSelectedCountryId,
  setSelectedMapVisibility,
  toggleAlert,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const map = useMap();
  const { theme } = useTheme();
  const [countryData, setCountryData] = useState<CountryData | undefined>();
  const [countryIso3Data, setCountryIso3Data] = useState<CountryIso3Data | undefined>();
  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBackClick = () => {
    setRegionData(undefined);
    setCountryData(undefined);
  };

  return (
    <div>
      <GeoJSON
        ref={(instance) => {
          geoJsonRef.current = instance;
        }}
        data={data}
        style={FcsChoroplethOperations.countryStyle}
        onEachFeature={(feature, layer) =>
          FcsChoroplethOperations.onEachFeature(
            feature,
            layer,
            map,
            selectedAlert,
            setSelectedCountryId,
            setLoading,
            setRegionData,
            setCountryData,
            setCountryIso3Data,
            setSelectedMapVisibility,
            setSelectedCountryName,
            toggleAlert,
            theme === 'dark'
          )
        }
      />
      {regionData && countryId === selectedCountryId && (
        <FscCountryChoropleth
          regionData={regionData}
          countryData={countryData}
          countryIso3Data={countryIso3Data}
          countryName={selectedCountryName}
          loading={loading}
          handleBackButtonClick={handleBackClick}
        />
      )}
    </div>
  );
}
