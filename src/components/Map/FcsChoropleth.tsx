import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

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
  loading,
  regionData,
  countryData,
  countryIso3Data,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { theme } = useTheme();

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
            selectedAlert,
            setSelectedCountryId,
            setSelectedMapVisibility,
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
          loading={loading}
        />
      )}
    </div>
  );
}
