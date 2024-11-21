import { LatLngExpression } from 'leaflet';

import { CountryAlertType } from '@/domain/enums/CountryAlertType';

export interface CountryAlert {
  type: CountryAlertType;
  position: LatLngExpression;
}
