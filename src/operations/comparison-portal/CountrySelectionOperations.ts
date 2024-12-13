import { SharedSelection } from '@nextui-org/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export class CountrySelectionOperations {
  static onSelectionChange(
    keys: SharedSelection,
    setSelectedCountries: (countries: CountryMapData[]) => void,
    countryMapData: CountryMapDataWrapper,
    pathname: string,
    router: AppRouterInstance
  ) {
    const keySet = new Set(keys as string);
    setSelectedCountries(
      countryMapData.features.filter((country) => keySet.has(country.properties.adm0_id.toString()))
    );
    router.push(`${pathname}?countries=${Array.from(keySet).join(',')}`);
  }
}
