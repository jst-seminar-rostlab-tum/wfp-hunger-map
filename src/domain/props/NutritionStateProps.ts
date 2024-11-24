import { GeoJsonProperties, Geometry } from 'geojson';
import { Layer } from 'leaflet';
import React from 'react';

import { CountryMimiData } from '../entities/country/CountryMimiData';

export interface NutrientOption {
  label: string;
  key: string;
}

export interface AccordionItem {
  title: string;
  iconSrc: string;
  description: string;
  content: JSX.Element;
}

export interface NutritionStateChoroplethProps {
  regionNutri: CountryMimiData | undefined;
  regionData: GeoJSON.FeatureCollection<Geometry, GeoJsonProperties>;
  handleClick?: (feature: GeoJsonProperties) => void;
  tooltip?: { className?: string };
}

export interface NutrientAccordionProps {
  selectedNutrient: string;
  setSelectedNutrient: React.Dispatch<React.SetStateAction<string>>;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}

export type LayerWithFeature = Layer & {
  feature?: GeoJSON.Feature<Geometry, GeoJsonProperties>;
};
