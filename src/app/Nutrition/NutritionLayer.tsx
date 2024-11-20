import 'leaflet/dist/leaflet.css';

import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { LeafletMouseEvent } from 'leaflet';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GeoJSON, useMap } from 'react-leaflet';

import LegendContainer from '@/components/Legend/LegendContainer';
import NutritionChoroplethProps from '@/domain/props/NutritionLayerProps';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem';
import CountryRepositoryImpl from '@/infrastructure/repositories/CountryRepositoryImpl';

import StateChoropleth from './NutritionStateLayer';

const CountryRepo = new CountryRepositoryImpl();

export default function NutritionChoropleth({
  data,
  style,
  handleClick = () => {},
  onEachFeature = () => {},
  tooltip,
}: NutritionChoroplethProps) {
  const [regionData, setRegionData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [showStateChoropleth, setShowStateChoropleth] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<GeoJSON.FeatureCollection | undefined>(undefined);

  // Define ref type
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const map = useMap();

  const handleCountryClick = async (feature: Feature<Geometry, GeoJsonProperties>, bounds: L.LatLngBounds) => {
    const countryId = feature.properties?.adm0_id;
    if (countryId) {
      try {
        const regData = await CountryRepo.getRegionData(countryId);
        const regNutritionData = await CountryRepo.getRegionNutritionData(countryId);
        setSelectedCountryId(regNutritionData as GeoJSON.FeatureCollection);
        console.log('bulshit', regNutritionData);
        if (regData && regData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: regData.features as GeoJSON.Feature[],
          });
          setShowStateChoropleth(true);
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    }
    if (handleClick) handleClick(feature, bounds, map);
  };

  const features = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    layer.on({
      click: (e: LeafletMouseEvent) => {
        handleCountryClick(e.target.feature, e.target.getBounds());
      },
    });

    if (onEachFeature) onEachFeature(feature, layer);

    const content = tooltip ? tooltip.render(feature) : feature.properties?.adm0_name;
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(content);

    layer.bindTooltip(div, { sticky: true, className: tooltip ? tooltip.className : 'countryTooltip' });
  };
  const legendItem: PointLegendContainerItem = {
    title: 'Analysis Distribution',
    records: [
      {
        label: 'Actual Data',
        color: 'clusterOrange',
      },
      {
        label: 'Predicted Data',
        color: 'outlinedHover',
      },
      {
        label: 'Not Analyzed',
        color: 'nutritionNotAnalyzed',
      },
    ],
  };

  return (
    <>
      <GeoJSON ref={geoJsonRef} style={style} data={data} onEachFeature={features} />
      <div className="absolute bottom-5 right-0 z-50 pr-10">
        <LegendContainer items={[legendItem]} />
      </div>
      {showStateChoropleth && regionData && (
        <StateChoropleth
          regionNutri={selectedCountryId}
          regionData={regionData}
          handleClick={(feature: GeoJsonProperties) => console.log('State clicked:', feature)}
          tooltip={{
            render: (feature: GeoJsonProperties) => `<div>${feature?.properties?.Name}</div>`,
            className: 'state-tooltip',
          }}
        />
      )}
    </>
  );
}
