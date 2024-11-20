import { CountryAlertType } from '@/domain/enums/CountryAlertType';

export const countryAlertsColors: Record<CountryAlertType, string> = {
  [CountryAlertType.FATALITY]: 'fatalityAlert',
  [CountryAlertType.CLIMATE_WET]: 'climateWetAlert',
  [CountryAlertType.CLIMATE_DRY]: 'climateDryAlert',
};

export const countryAlertsLabels: Record<CountryAlertType, string> = {
  [CountryAlertType.FATALITY]: 'Countries with ≥ 1 fatality /200,000 in the last 30 days.',
  [CountryAlertType.CLIMATE_WET]: '% of people living in areas with significant excess rainfall &gt; 15%',
  [CountryAlertType.CLIMATE_DRY]: '% of people living in areas with deficit in rainfall or vegetation &gt; 15%',
};
