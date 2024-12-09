import { Feature } from 'geojson';
import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';
import { MapboxMapOperations } from '@/operations/map/MapboxMapOperations';

import CountryLoadingLayer from './CountryLoading';
import FscCountryChoropleth from './FcsCountryChoropleth';

export default function FcsChoropleth({
  data,
  countryId,
  loading,
  regionData,
  countryData,
  countryIso3Data,
  selectedCountryName,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();

  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  // adding the country name as a tooltip to each layer (on hover); the tooltip is not shown if the country is selected
  useEffect(() => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.eachLayer((layer: LayerWithFeature) => {
      if (!layer) return;
      const feature = layer.feature as Feature;
      if (feature.properties?.adm0_id !== selectedCountryId) {
        const tooltipContainer = MapboxMapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
        layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
      } else {
        layer.unbindTooltip();
      }
    });
  }, [selectedCountryId]);

  return (
    <div>
      <GeoJSON
        ref={(instance) => {
          geoJsonRef.current = instance;
        }}
        data={data}
        style={FcsChoroplethOperations.countryStyle}
        onEachFeature={(feature, layer) => FcsChoroplethOperations.onEachFeature(feature, layer, setSelectedCountryId)}
      />
      {/* Animated GeoJSON layer for the selected country */}
      {!regionData && selectedCountryId && (
        <CountryLoadingLayer
          data={data}
          selectedCountryId={selectedCountryId}
          color="hsl(var(--nextui-fcsAnimation))"
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
