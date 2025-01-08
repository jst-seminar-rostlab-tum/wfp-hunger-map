import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';

export default interface IpcAccordionProps {
  countryData: CountryData | undefined;
  countryName?: string;
  loading: boolean;
  countryIso3Data: CountryIso3Data | undefined;
}
