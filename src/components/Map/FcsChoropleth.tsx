import { Feature } from 'geojson';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
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
  fcsData,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { theme } = useTheme();

  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  // adding the country name as a tooltip to each layer (on hover); the tooltip is not shown if the country is selected
  useEffect(() => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.eachLayer((layer: LayerWithFeature) => {
      if (!layer) return;
      const feature = layer.feature as Feature;
      if (FcsChoroplethOperations.checkIfActive(data.features[0] as CountryMapData, fcsData)) {
        const tooltipContainer = MapboxMapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
        layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
      } else {
        layer.unbindTooltip();
      }
    });
  }, [selectedCountryId]);

  return (
    <div>
      {countryId !== selectedCountryId && (
        <GeoJSON
          ref={(instance) => {
            geoJsonRef.current = instance;
          }}
          data={data}
          style={FcsChoroplethOperations.countryStyle(data.features[0], theme === 'dark', fcsData)}
          onEachFeature={(feature, layer) =>
            FcsChoroplethOperations.onEachFeature(feature, layer, setSelectedCountryId, theme === 'dark', fcsData)
          }
        />
      )}
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
