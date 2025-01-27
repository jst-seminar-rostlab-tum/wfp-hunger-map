import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';

import { useSelectedCountryId } from '../contexts/SelectedCountryIdContext';
import { useSelectedMap } from '../contexts/SelectedMapContext';
import { AlertType } from '../enums/AlertType';
import { GlobalInsight } from '../enums/GlobalInsight';

/**
 * Return a state that is synchronized with the `countries` query param.
 * Whereas the returned state value and update function work with arrays of `CountryMapData`, the query param is using the `adm0_id`.
 *
 * Note: It is assumed that there is only one relevant query param, any others will be erased on change.
 */
export const useSelectedCountriesParam = (countryMapData: CountryMapDataWrapper) => {
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
    const selectedCountryIdQuerys = newValue?.map((country) => country.properties.adm0_id) ?? [];
    router.push(`${pathname}?${PARAM_NAME}=${selectedCountryIdQuerys.join(',')}`);
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
export const useSearchQueryParam = () => {
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

export const useSelectedCountryParam = () => {
  const PARAM_NAME = 'countryId';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCountryIdQuery, setSelectedCountryIdQuery] = useState<number | undefined>(undefined);
  const { setSelectedCountryId } = useSelectedCountryId();

  useEffect(() => {
    const countryId = searchParams.get(PARAM_NAME);
    setSelectedCountryIdQuery(countryId ? parseInt(countryId, 10) : undefined);
    setSelectedCountryId(countryId ? parseInt(countryId, 10) : null);
  }, [searchParams]);

  const setSelectedCountryIdQueryFn = (id: number | undefined) => {
    setSelectedCountryIdQuery(id);
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (id !== undefined) {
      updatedParams.set(PARAM_NAME, id.toString());
    } else {
      updatedParams.delete(PARAM_NAME);
    }

    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return [selectedCountryIdQuery, setSelectedCountryIdQueryFn] as const;
};

export const useSelectedMapTypeParam = () => {
  const { setSelectedMapType } = useSelectedMap();
  const PARAM_NAME = 'selectedMap';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedMap, setSelectedMap] = useState<GlobalInsight>(GlobalInsight.FOOD);

  useEffect(() => {
    const mapType = searchParams.get(PARAM_NAME);
    // Update the state based on the query param (only if it's valid and differs from current state)
    if (mapType) {
      let mapEnum: GlobalInsight;
      switch (mapType) {
        case 'nutrition':
          mapEnum = GlobalInsight.NUTRITION;
          break;
        case 'ipc':
          mapEnum = GlobalInsight.IPC;
          break;
        case 'rainfall':
          mapEnum = GlobalInsight.RAINFALL;
          break;
        case 'vegetation':
          mapEnum = GlobalInsight.VEGETATION;
          break;
        default:
          mapEnum = GlobalInsight.FOOD;
          break;
      }

      // Update only if the selected map differs
      if (mapEnum !== selectedMap) {
        setSelectedMap(mapEnum);
        setSelectedMapType(mapEnum);
      }
    }
  }, [searchParams]);

  const setSelectedMapFn = (mapType: GlobalInsight) => {
    // Update the selected map type
    setSelectedMap(mapType);
    // Update URL query parameter
    let updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set(PARAM_NAME, mapType.toLowerCase() ?? 'none');
    router.push(`${pathname}?${updatedParams.toString()}`);
    setTimeout(() => {
      updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.set(PARAM_NAME, mapType.toLowerCase() ?? 'none');
      router.push(`${pathname}?${updatedParams.toString()}`);
    }, 10);
  };

  return [selectedMap, setSelectedMapFn] as const;
};

export const useSelectedAlertParam = () => {
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(AlertType.COUNTRY_ALERTS);
  const PARAM_NAME = 'alert';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const alertType = searchParams.get(PARAM_NAME);
    switch (alertType) {
      case 'none':
        setSelectedAlert(null);
        break;
      case 'conflicts':
        setSelectedAlert(AlertType.CONFLICTS);
        break;
      case 'hazards':
        setSelectedAlert(AlertType.HAZARDS);
        break;
      case 'countryAlerts':
      default:
        setSelectedAlert(AlertType.COUNTRY_ALERTS);
        break;
    }
  }, [searchParams]);

  const setAlertFn = (alertType: AlertType | null) => {
    setSelectedAlert(alertType);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set(PARAM_NAME, alertType ?? 'none');
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return [selectedAlert, setAlertFn] as const;
};
