import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type QueryParams = {
  countryId: number | null;
};

type QueryParamKey = keyof QueryParams;

interface QueryParamState {
  queryParams: Partial<QueryParams>;
  setQueryParam: <T extends QueryParamKey>(param: T, value: QueryParams[T]) => void;
}

const QueryParamsContext = createContext<QueryParamState | undefined>(undefined);

export function QueryParamsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [queryParams, setQueryParams] = useState<Partial<QueryParams>>({});

  const setQueryParam = <T extends QueryParamKey>(param: T, value: QueryParams[T]) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [param]: value,
    }));
  };

  useEffect(() => {
    setQueryParam('countryId', Number(searchParams.get('countryId')));
  }, [searchParams]);

  useEffect(() => {
    const stringifiedParams = Object.entries(queryParams)
      .filter((entry) => entry[1] !== null && entry[1] !== undefined)
      .map(([key, value]) => [key, value!.toString()]);
    router.push(`${pathname}?${new URLSearchParams(stringifiedParams)}`);
  }, [queryParams]);

  const value = useMemo(() => ({ setQueryParam, queryParams }), [queryParams]);

  return <QueryParamsContext.Provider value={value}>{children}</QueryParamsContext.Provider>;
}

export function useQueryParams() {
  const context = useContext(QueryParamsContext);
  if (!context) {
    throw new Error('useSelectedCountryId must be used within a QueryParamsProvider');
  }
  return context;
}
