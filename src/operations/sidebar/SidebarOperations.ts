import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';
import { SidebarAlertType } from '@/domain/entities/sidebar/SidebarAlertType';
import { SidebarMapType } from '@/domain/entities/sidebar/SidebarMapType';
import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import FcsChoroplethOperations from '@/operations/map/FcsChoroplethOperations.ts';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';
import NutritionChoroplethOperations from '@/operations/map/NutritionChoroplethOperations.ts';

export class SidebarOperations {
  public static getSidebarMapTypes(): SidebarMapType[] {
    return [
      {
        key: GlobalInsight.FOOD,
        label: 'Food consumption',
        icon: '/menu_fcs.webp',
      },
      {
        key: GlobalInsight.NUTRITION,
        label: 'Nutrition',
        icon: '/menu_nutri.webp',
      },
      {
        key: GlobalInsight.VEGETATION,
        label: 'Vegetation',
        icon: '/menu_ndvi.webp',
      },
      {
        key: GlobalInsight.RAINFALL,
        label: 'Rainfall',
        icon: '/menu_rainfall.webp',
      },
      {
        key: GlobalInsight.IPC,
        label: 'IPC/CH',
        icon: '/menu_ipc.webp',
      },
    ];
  }

  static sidebarAlertTypes: SidebarAlertType[] = [
    {
      key: AlertType.COUNTRY_ALERTS,
      label: 'Country Alerts',
      icon: '/country_alerts.svg',
    },
    {
      key: AlertType.HAZARDS,
      label: 'Hazards',
      icon: '/menu_hazards.webp',
    },
    {
      key: AlertType.CONFLICTS,
      label: 'Conflicts',
      icon: '/menu_conflicts.webp',
    },
  ];

  public static getSidebarAlertTypes(): SidebarAlertType[] {
    return SidebarOperations.sidebarAlertTypes;
  }

  public static getSidebarAlertTypeByKey(key: AlertType): SidebarAlertType | undefined {
    return SidebarOperations.sidebarAlertTypes.find((alert) => alert.key === key);
  }

  public static hasSubalerts(item: SidebarAlertType): item is SidebarAlertType & { subalerts: SidebarAlertType[] } {
    return 'subalerts' in item;
  }

  static checkAvailabilityOfData(
    country: CountryMapData,
    selectedMapType: GlobalInsight,
    fcsData: Record<string, CountryFcsData>,
    nutritionData: CountryNutrition | undefined,
    ipcData: CountryIpcData[] | undefined
  ): boolean {
    switch (selectedMapType) {
      case GlobalInsight.FOOD:
        return FcsChoroplethOperations.checkIfActive(country, fcsData);
      case GlobalInsight.NUTRITION:
        if (nutritionData) return NutritionChoroplethOperations.checkIfActive(country, nutritionData);
        break;
      case GlobalInsight.VEGETATION:
        return false;
      case GlobalInsight.RAINFALL:
        return false;
      case GlobalInsight.IPC:
        if (ipcData) return IpcChoroplethOperations.checkIfActive(country, ipcData);
        break;
      default:
        return false;
    }
    return false;
  }
}
