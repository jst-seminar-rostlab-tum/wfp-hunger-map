import { Dispatch, SetStateAction } from 'react';

import { CountryMapData } from '../entities/country/CountryMapData';

export default interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[] | undefined;
  setSelectedCountries: (newCountries: CountryMapData[]) => void;
  setDisabledCountryIds: Dispatch<SetStateAction<string[]>>;
}
