import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';

export default interface FcsAccordionProps {
  countryData: CountryData | undefined;
  countryIso3Data: CountryIso3Data | undefined;
  loading: boolean;
}
