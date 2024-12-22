import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';

// returns a state value that is synchronized with a query param
// assumes there is one that single query param, all others will be erased
export const useSelectedCountries = (countryMapData: CountryMapDataWrapper) => {
  const PARAM_NAME = 'countries';

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[] | undefined>(undefined);

  // get state values from query params
  useEffect(() => {
    const searchParamCountryCodes = searchParams.get(PARAM_NAME)?.split(',') ?? [];
    const newSelectedCountries = countryMapData.features.filter((availableCountry) =>
      searchParamCountryCodes.includes(availableCountry.properties.adm0_id.toString())
    );
    setSelectedCountries(newSelectedCountries);
  }, [searchParams]);

  // update state and query params with new value
  const setSelectedCountriesFn = (newValue: CountryMapData[] | undefined) => {
    setSelectedCountries(newValue);
    const selectedCountryIds = newValue?.map((country) => country.properties.adm0_id) ?? [];
    router.push(`${pathname}?${PARAM_NAME}=${selectedCountryIds.join(',')}`);
  };

  return [selectedCountries, setSelectedCountriesFn] as const;
};
