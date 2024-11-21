import L, { MarkerCluster } from 'leaflet';

import HazardAlertsConstants from '@/domain/constant/alerts/HazardAlertsConstants.ts';
import { Hazard } from '@/domain/entities/alerts/Hazard';
import { HazardType } from '@/domain/enums/HazardType';

export default class HazardOperations {
  static sortHazardsByType(data?: Hazard[]): Record<HazardType, Hazard[]> {
    const result: Record<HazardType, Hazard[]> = {
      [HazardType.AVALANCHE]: [],
      [HazardType.BIOMEDICAL]: [],
      [HazardType.CYCLONE]: [],
      [HazardType.DROUGHT]: [],
      [HazardType.EARTHQUAKE]: [],
      [HazardType.EXTREMETEMPERATURE]: [],
      [HazardType.FLOOD]: [],
      [HazardType.HIGHSURF]: [],
      [HazardType.HIGHWIND]: [],
      [HazardType.LANDSLIDE]: [],
      [HazardType.MANMADE]: [],
      [HazardType.MARINE]: [],
      [HazardType.STORM]: [],
      [HazardType.TORNADO]: [],
      [HazardType.TSUNAMI]: [],
      [HazardType.VOLCANO]: [],
      [HazardType.WILDFIRE]: [],
      [HazardType.WINTERSTORM]: [],
    };
    data?.forEach((hazard) => {
      result[hazard.type]?.push(hazard);
    });
    return result;
  }

  static createClusterCustomIcon(cluster: MarkerCluster, hazardType: HazardType): L.DivIcon {
    return L.divIcon({
      html: `
        <div class="relative">
          <img src="${HazardAlertsConstants.hazardIconUrls[hazardType]}" style="width: 40px; height: 40px" alt="Hazard cluster">
          <span style="width: 22px; height: 22px; top: -10px; left: 25px" class="absolute flex items-center justify-center font-bold rounded-full bg-primary text-white">${cluster.getChildCount()}</span>
        </div>
      `,
      className: '',
    });
  }
}
