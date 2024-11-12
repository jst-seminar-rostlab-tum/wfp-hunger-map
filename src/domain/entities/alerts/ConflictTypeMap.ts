import { ConflictType } from '@/domain/enums/ConflictType';

import { Conflict } from './Conflict';

export type ConflictTypeMap = { [K in ConflictType]: Conflict[] };
