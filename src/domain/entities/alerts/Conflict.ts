import { ConflictType } from '@/domain/enums/ConflictType';

import { Feature } from '../common/Feature';

export type Conflict = Feature<{
  count: number;
  event_type: ConflictType;
}>;
