import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';

import FcsAccordion from './FcsAccordion';

interface FscCountryChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData: CountryData | undefined;
  countryIso3Data: CountryIso3Data | undefined;
  loading: boolean;
}

function FscCountryChoropleth({ data, countryData, countryIso3Data, loading }: FscCountryChoroplethProps) {
  const fcsFill = (fcs: number | null) => {
    if (fcs === null) return 'none';
    if (fcs <= 0.05) return '#29563A';
    if (fcs <= 0.1) return '#73B358';
    if (fcs <= 0.2) return '#CBCC58';
    if (fcs <= 0.3) return '#d5a137';
    if (fcs <= 0.4) return '#EB5A26';
    return '#D3130C';
  };

  const dynamicStyle: L.StyleFunction<GeoJsonProperties> = (feature) => {
    return {
      fillColor: fcsFill(feature?.properties?.fcs?.score),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    const tooltipContent = `
      <b>${feature.properties?.Name}</b><br/>
      Tooltip Content
    `;
    layer.bindTooltip(tooltipContent, { className: 'state-tooltip' });

    const pathLayer = layer as L.Path;
    pathLayer.on({
      mouseout: () => {
        pathLayer.setStyle(dynamicStyle(feature));
      },
      click: () => {},
    });
  };

  return (
    <div>
      <FcsAccordion countryData={countryData} countryIso3Data={countryIso3Data} loading={loading} />
      <GeoJSON data={data} style={dynamicStyle} onEachFeature={onEachFeature} />
    </div>
  );
}

export default FscCountryChoropleth;
