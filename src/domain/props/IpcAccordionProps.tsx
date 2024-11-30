import { CountryData } from '../entities/country/CountryData';

export default interface IpcAccordionProps {
  countryData: CountryData | undefined;
  countryName: string | null;
}
