import { SharedSelection } from '@nextui-org/react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export class CountrySelectionOperations {
  static onSelectionChange(
    keys: SharedSelection,
    setSelectedCountries: (countries: CountryMapData[]) => void,
    countryMapData: CountryMapDataWrapper
  ) {
    const keySet = new Set(keys as string);
    setSelectedCountries(
      countryMapData.features.filter((country) => keySet.has(country.properties.adm0_id.toString()))
    );
  }
}
