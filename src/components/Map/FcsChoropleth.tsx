import { Feature } from 'geojson';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import FcsChoroplethProps from '@/domain/props/FcsChoroplethProps';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations';
import { MapOperations } from '@/operations/map/MapOperations';

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
  fcsData,
  regionLabelData,
}: FcsChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const [regionLabelTooltips, setRegionLabelTooltips] = useState<L.Tooltip[]>([]);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { theme } = useTheme();
  const map = useMap();

  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  // adding the country name as a tooltip to each layer (on hover); the tooltip is not shown if the country is selected
  useEffect(() => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.eachLayer((layer: LayerWithFeature) => {
      if (!layer) return;
      const feature = layer.feature as Feature;
      if (FcsChoroplethOperations.checkIfActive(feature as CountryMapData, fcsData)) {
        const tooltipContainer = MapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
        layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
      } else {
        layer.unbindTooltip();
      }
    });
  }, [selectedCountryId]);

  useEffect(() => {
    if (selectedCountryId !== data.features[0].properties?.adm0_id) {
      regionLabelTooltips.forEach((tooltip) => tooltip.removeFrom(map));
    }
  }, [selectedCountryId, regionLabelTooltips]);

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
            FcsChoroplethOperations.onEachFeature(feature, layer, setSelectedCountryId, fcsData)
          }
        />
      )}
      {/* Animated GeoJSON layer for the selected country */}
      {!regionData && selectedCountryId && (
        <CountryLoadingLayer
          data={data}
          selectedCountryId={selectedCountryId}
          color="hsl(var(--nextui-fcsAnimation))"
        />
      )}
      {regionData && countryId === selectedCountryId && regionLabelData && (
        <FscCountryChoropleth
          regionData={regionData}
          countryData={countryData}
          countryIso3Data={countryIso3Data}
          countryName={selectedCountryName}
          loading={loading}
          handleBackButtonClick={handleBackClick}
          regionLabelData={regionLabelData}
          countryMapData={data.features[0] as CountryMapData}
          regionLabelTooltips={regionLabelTooltips}
          setRegionLabelTooltips={setRegionLabelTooltips}
        />
      )}
    </div>
  );
}
