import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Layer } from 'leaflet';
import React from 'react';

import { CountryMimiData } from '../entities/country/CountryMimiData';

export interface NutrientOption {
  label: string;
  key: string;
}

export interface NutritionStateChoroplethProps {
  regionNutrition: CountryMimiData | undefined;
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryName: string | null;
  handleClick?: (feature: GeoJsonProperties) => void;
  handleBackButtonClick?: () => void;
  tooltip?: { className?: string };
}

export interface NutrientAccordionProps {
  selectedNutrient: string;
  setSelectedNutrient: React.Dispatch<React.SetStateAction<string>>;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}

export type LayerWithFeature = Layer & {
  feature?: Feature<Geometry, GeoJsonProperties>;
};
