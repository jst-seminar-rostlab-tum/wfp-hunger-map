import { ConflictType } from '@/domain/enums/ConflictType';

import { Geometry } from '../common/Geometry';

export interface Conflict {
  type: string;
  geometry: Geometry;
  properties: {
    count: number;
    event_type: ConflictType;
  };
}
