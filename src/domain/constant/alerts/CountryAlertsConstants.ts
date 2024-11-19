import { CountryAlertType } from '@/domain/enums/CountryAlertType';

export const countryAlertsColors: Record<CountryAlertType, string> = {
  [CountryAlertType.FATALITY]: 'fatalityAlert',
  [CountryAlertType.CLIMATE_WET]: 'climateWetAlert',
  [CountryAlertType.CLIMATE_DRY]: 'climateDryAlert',
};
