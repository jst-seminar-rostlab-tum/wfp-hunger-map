import { CountryData } from '../entities/country/CountryData';

export default interface IpcFoodSecurityAccordionProps {
  countryData: CountryData | undefined;
  deltaOneMonth: number | null;
  deltaThreeMonth: number | null;
}
