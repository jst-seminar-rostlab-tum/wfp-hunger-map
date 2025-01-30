import React from 'react';

import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

export type QueryParams = {
  alert: AlertType | null;
  countryId: number | null;
  mapType: GlobalInsight;
};
export type QueryParamKey = keyof QueryParams;

export interface QueryParamState {
  queryParams: Partial<QueryParams>;
  setQueryParam: <T extends QueryParamKey>(param: T, value: QueryParams[T]) => void;
  setQueryParams: React.Dispatch<React.SetStateAction<Partial<QueryParams>>>;
}
