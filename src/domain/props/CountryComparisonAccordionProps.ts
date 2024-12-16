import React from 'react';

import { CountryMapData } from '../entities/country/CountryMapData';

export default interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<CountryMapData[]>>;
}
