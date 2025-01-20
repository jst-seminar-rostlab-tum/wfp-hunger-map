import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';

/**
 * Return a state that is synchronized with the `countries` query param.
 * Whereas the returned state value and update function work with arrays of `CountryMapData`, the query param is using the `adm0_id`.
 *
 * @param {CountryMapDataWrapper} countryMapData Polygon and alert data for all selected countries
 * @return `[selectedCountries, setSelectedCountries]` similar to a `useState<CountryMapData[] | undefined>` call
 */
export const useSelectedCountries = (countryMapData: CountryMapDataWrapper) => {
  const PARAM_NAME = 'countries';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[] | undefined>(undefined);

  useEffect(() => {
    const countryIds = searchParams.get(PARAM_NAME)?.split(',') ?? [];
    const countries = countryMapData.features.filter((country) =>
      countryIds.includes(country.properties.adm0_id.toString())
    );
    setSelectedCountries(countries);
  }, [searchParams]);

  const setSelectedCountriesFn = (countries: CountryMapData[] | undefined) => {
    setSelectedCountries(countries);
    const countryIds = countries?.map((c) => c.properties.adm0_id) ?? [];
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (countryIds.length > 0) {
      updatedParams.set(PARAM_NAME, countryIds.join(','));
    } else {
      updatedParams.delete(PARAM_NAME);
    }
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return [selectedCountries, setSelectedCountriesFn] as const;
};

/**
 * Return a state that is synchronized with the `tab` query param.
 *
 * @return `[selectedTab, setSelectedTab]` similar to a `useState<string>` call
 */
export const useSelectedTab = () => {
  const PARAM_NAME = 'tab';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return searchParams.get(PARAM_NAME) ?? 'country';
  });

  useEffect(() => {
    setSelectedTab(searchParams.get(PARAM_NAME) ?? 'country');
  }, [searchParams]);

  const setSelectedTabFn = (tab: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (tab) {
      updatedParams.set(PARAM_NAME, tab);
    } else {
      updatedParams.delete(PARAM_NAME);
    }
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return [selectedTab, setSelectedTabFn] as const;
};

/**
 * Return a state that is synchronized with the `regions` and `regionComparisonCountry query params.
 * Regions are stored as array of their IDs (converted to strings) or a single string `'all'`.
 * The country is stored as `string` of its `adm0_id`.
 *
 * @return `{selectedRegions, setSelectedRegions, selectedRegionComparisonCountry, setSelectedRegionComparisonCountry}` similar to `useState` calls.
 */
export const useSelectedRegions = () => {
  const REGION_PARAM = 'regions';
  const COMPARISON_COUNTRY_PARAM = 'regionComparisonCountry';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedRegions, setSelectedRegions] = useState<string[] | 'all'>([]);
  const [selectedRegionComparisonCountry, setSelectedRegionComparisonCountry] = useState<string | undefined>(undefined);

  useEffect(() => {
    const regionParam = searchParams.get(REGION_PARAM);
    if (regionParam === 'all') setSelectedRegions('all');
    else setSelectedRegions(regionParam?.split(',') ?? []);

    setSelectedRegionComparisonCountry(searchParams.get(COMPARISON_COUNTRY_PARAM) ?? undefined);
  }, [searchParams]);

  const setSelectedRegionsFn = (regions: string[] | 'all', nAvailableRegions: number | undefined) => {
    // Use 'all' instead of the array if possible to have a cleaner query param.
    // eslint-disable-next-line no-param-reassign
    if (regions.length === nAvailableRegions) regions = 'all';

    setSelectedRegions(regions);
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (regions === 'all') {
      updatedParams.set(REGION_PARAM, 'all');
    } else if (regions.length > 0) {
      updatedParams.set(REGION_PARAM, regions.join(','));
    } else {
      updatedParams.delete(REGION_PARAM);
    }
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  const setSelectedRegionComparisonCountryFn = (comparisonCountry: string | undefined) => {
    setSelectedRegionComparisonCountry(comparisonCountry);
    setSelectedRegions([]);
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (comparisonCountry) {
      updatedParams.set(COMPARISON_COUNTRY_PARAM, comparisonCountry);
      updatedParams.delete(REGION_PARAM);
    } else {
      updatedParams.delete(COMPARISON_COUNTRY_PARAM);
    }
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return {
    selectedRegions,
    setSelectedRegions: setSelectedRegionsFn,
    selectedRegionComparisonCountry,
    setSelectedRegionComparisonCountry: setSelectedRegionComparisonCountryFn,
  };
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
