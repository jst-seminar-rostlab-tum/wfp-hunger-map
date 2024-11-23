import L, { MarkerCluster } from 'leaflet';

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

  static sortConflictsByType(data?: Conflict[]): Record<ConflictType, Conflict[]> {
    const result: Record<ConflictType, Conflict[]> = {
      [ConflictType.BATTLES]: [],
      [ConflictType.PROTESTS]: [],
      [ConflictType.RIOTS]: [],
      [ConflictType.CIVIL_VIOLENCE]: [],
      [ConflictType.EXPLOSIONS]: [],
      [ConflictType.STRATEGIC]: [],
    };
    data?.forEach((conflict) => {
      result[conflict.properties.event_type].push(conflict);
    });
    return result;
  }

  static createClusterCustomIcon(cluster: MarkerCluster, conflictType: ConflictType): L.DivIcon {
    return L.divIcon({
      html: `<span
              style="
                width: ${Math.min(Math.floor(cluster.getChildCount() / 5) + 20, 40)}px;
                height: ${Math.min(Math.floor(cluster.getChildCount() / 5) + 20, 40)}px;
              "
              class="bg-${ConflictOperations.getMarkerColor(conflictType)} flex items-center justify-center rounded-full border-white border-1 text-white font-bold"
            >${cluster.getChildCount()}</span>`,
      className: '',
      iconSize: L.point(40, 40, true),
    });
  }
}
