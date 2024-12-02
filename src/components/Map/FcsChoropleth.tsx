import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';
import { MapboxMapOperations } from '@/operations/map/MapboxMapOperations';

import FscCountryChoropleth from './FcsCountryChoropleth';

export default function FcsChoropleth({
  data,
  countryId,
  selectedCountryId,
  setSelectedCountryId,
  loading,
  regionData,
  countryData,
  countryIso3Data,
  selectedCountryName,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { theme } = useTheme();

  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  return (
    <div>
      <GeoJSON
        ref={(instance) => {
          geoJsonRef.current = instance;
        }}
        data={data}
        style={FcsChoroplethOperations.countryStyle}
        onEachFeature={(feature, layer) => {
          // tooltip on country hover -> showing name
          const tooltipContainer = MapboxMapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
          layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });

          FcsChoroplethOperations.onEachFeature(feature, layer, setSelectedCountryId, theme === 'dark');
        }}
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
