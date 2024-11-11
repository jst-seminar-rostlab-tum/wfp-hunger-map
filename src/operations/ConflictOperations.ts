import { Conflict } from '@/domain/entities/alerts/Conflict';
import { ConflictType } from '@/domain/enums/ConflictType';

export default class ConflictOperations {
  static getMarkerColor(conflictType: ConflictType): string {
    switch (conflictType) {
      case ConflictType.PROTESTS:
        return '#0d657de6';
      case ConflictType.RIOTS:
        return '#c95200e6';
      case ConflictType.BATTLES:
        return '#7d0631';
      case ConflictType.CIVIL_VIOLENCE:
        return '#96badc';
      case ConflictType.EXPLOSIONS:
        return '#eaaf75';
      default:
        return '#bec0c1';
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
