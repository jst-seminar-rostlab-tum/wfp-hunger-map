import { Conflict } from '@/domain/entities/alerts/Conflict';
import { ConflictType } from '@/domain/enums/ConflictType';

export default class ConflictOperations {
  static getMarkerColor(conflictType: ConflictType): string {
    switch (conflictType) {
      case ConflictType.PROTESTS:
        return 'conflictProtest';
      case ConflictType.RIOTS:
        return 'conflictRiot';
      case ConflictType.BATTLES:
        return 'conflictBattle';
      case ConflictType.CIVIL_VIOLENCE:
        return 'conflictCivil';
      case ConflictType.EXPLOSIONS:
        return 'conflictExplosion';
      default:
        return 'conflictStrategic';
    }
  }

  static sortConflictsByType(data?: Conflict[]) {
    const result: { [K in ConflictType]: Conflict[] } = {
      [ConflictType.BATTLES]: [],
      [ConflictType.PROTESTS]: [],
      [ConflictType.RIOTS]: [],
      [ConflictType.CIVIL_VIOLENCE]: [],
      [ConflictType.EXPLOSIONS]: [],
      [ConflictType.STRATEGIC]: [],
    };
    data?.forEach((c) => {
      result[c.properties.event_type].push(c);
    });
    return result;
  }
}
