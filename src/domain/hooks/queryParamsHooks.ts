import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';

/**
 * Return a state that is synchronized with the `countries` query param.
 * Whereas the returned state value and update function work with arrays of `CountryMapData`, the query param is using the `adm0_id`.
 *
 * Note: It is assumed that there is only one relevant query param, any others will be erased on change.
 */
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

/**
 * Return a delayed version of `input` that only changes after `input` has been constant for `msDelay` Milliseconds.
 * This is useful for not triggering an event while a user is typing.
 *
 * @param {string} input The raw user input
 * @param {number} msDelay Number of milliseconds without input changes that leads to a changed the output
 * @return {string} debounced input
 */
const useDebounce = (input: string, msDelay: number) => {
  const [output, setOutput] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutput(input);
    }, msDelay);

    return () => clearTimeout(timeout);
  }, [input, msDelay]);
  return output;
};

/**
 * Return a state that is synchronized with the `search` query param.
 * Updates to the query params happen in a debounced way to keep the browser history clean.
 *
 * Note: It is assumed that there is only one relevant query param, any others will be erased on change.
 * @return {[string, (newValue: string) => void]} the current (non-debounced) query and a function to update the query
 */
export const useSearchQuery = () => {
  const PARAM_NAME = 'search';
  const DEBOUNCE_MS = 350;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_MS);
  const [recentUserInput, setRecentUserInput] = useState(false);

  // get state values from query params (on browser navigation)
  useEffect(() => {
    // only update the state if the param change resulted from browser navigation
    if (recentUserInput) setRecentUserInput(false);
    else setSearchQuery(searchParams.get(PARAM_NAME) ?? '');
  }, [searchParams]);

  // set query params from debounced state (on search input change)
  useEffect(() => {
    router.push(`${pathname}?${PARAM_NAME}=${debouncedSearch}`);
  }, [debouncedSearch]);

  const setSearchQueryFn = (newValue: string) => {
    setSearchQuery(newValue);
    setRecentUserInput(true);
  };

  return [searchQuery, setSearchQueryFn] as const;
};
