import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Layer } from 'leaflet';
import React from 'react';

export interface NutrientOption {
  label: string;
  key: string;
}

export interface NutritionStateChoroplethProps {
  regionNutrition: FeatureCollection | undefined;
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryName?: string;
  handleClick?: (feature: GeoJsonProperties) => void;
  handleBackButtonClick?: () => void;
  tooltip?: { className?: string };
}

export interface NutrientAccordionProps {
  selectedNutrient: string;  // todo linus delete
  setSelectedNutrient: React.Dispatch<React.SetStateAction<string>>;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}

export type LayerWithFeature = Layer & {
  feature?: Feature<Geometry, GeoJsonProperties>;
};
