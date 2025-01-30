import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { QueryParamKey, QueryParams, QueryParamState } from '@/domain/entities/queryParams/QueryParams';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

import { AlertType } from '../enums/AlertType';

const QueryParamsContext = createContext<QueryParamState | undefined>(undefined);

const readAlertFromQueryParam = (alertParam: string | null, countryId: number | null) => {
  switch (alertParam) {
    case 'none':
      return null;
    case 'conflicts':
      return AlertType.CONFLICTS;
    case 'hazards':
      return AlertType.HAZARDS;
    case 'countryAlerts':
      return AlertType.COUNTRY_ALERTS;
    default:
      if (countryId) return null;
      return AlertType.COUNTRY_ALERTS;
  }
};

const readMapTypeFromQueryParam = (mapTypeParam: string | null) => {
  switch (mapTypeParam) {
    case 'nutrition':
      return GlobalInsight.NUTRITION;
    case 'ipc':
      return GlobalInsight.IPC;
    case 'rainfall':
      return GlobalInsight.RAINFALL;
    case 'vegetation':
      return GlobalInsight.VEGETATION;
    default:
      return GlobalInsight.FOOD;
  }
};

export function QueryParamsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [queryParams, setQueryParams] = useState<Partial<QueryParams>>({});

  // load state value from user input
  const setQueryParam = <T extends QueryParamKey>(param: T, value: QueryParams[T]) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [param]: value,
    }));
  };

  // load state values from URL
  useEffect(() => {
    const countryId = searchParams.get('countryId') ? Number(searchParams.get('countryId')) : null;
    const alert = readAlertFromQueryParam(searchParams.get('alert'), countryId);
    const mapType = readMapTypeFromQueryParam(searchParams.get('mapType'));

    setQueryParams((prevParams) => ({ ...prevParams, alert, countryId, mapType }));
  }, [searchParams]);

  // update URL from state values
  useEffect(() => {
    const stringifiedParams = Object.entries(queryParams)
      .filter((entry) => entry[1] !== null && entry[1] !== undefined)
      .map(([key, value]) => [key, value!.toString()]);
    router.push(`${pathname}?${new URLSearchParams(stringifiedParams)}`);
  }, [queryParams]);

  const value = useMemo(() => ({ setQueryParam, setQueryParams, queryParams }), [queryParams]);

  return <QueryParamsContext.Provider value={value}>{children}</QueryParamsContext.Provider>;
}

export function useQueryParams() {
  const context = useContext(QueryParamsContext);
  if (!context) {
    throw new Error('useSelectedCountryId must be used within a QueryParamsProvider');
  }
  return context;
}
