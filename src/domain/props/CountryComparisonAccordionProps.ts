import { CountryMapData } from '../entities/country/CountryMapData';

export default interface CountryComparisonAccordionProps {
  selectedCountries: CountryMapData[] | undefined;
  setSelectedCountries: (countries: CountryMapData[]) => void;
}
