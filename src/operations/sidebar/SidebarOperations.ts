import { SidebarAlertType } from '@/domain/entities/sidebar/SidebarAlertType';
import { SidebarMapType } from '@/domain/entities/sidebar/SidebarMapType';
import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

export class SidebarOperations {
  public static getSidebarMapTypes(): SidebarMapType[] {
    return [
      {
        key: GlobalInsight.FOOD,
        label: 'Food consumption',
        icon: '/menu_fcs.png',
      },
      {
        key: GlobalInsight.NUTRITION,
        label: 'Nutrition',
        icon: '/menu_nutri.png',
      },
      {
        key: GlobalInsight.VEGETATION,
        label: 'Vegetation',
        icon: '/menu_ndvi.png',
      },
      {
        key: GlobalInsight.RAINFALL,
        label: 'Rainfall',
        icon: '/menu_rainfall.png',
      },
      {
        key: GlobalInsight.IPC,
        label: 'IPC/CH',
        icon: '/menu_ipc.png',
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
      icon: '/menu_hazards.png',
    },
    {
      key: AlertType.CONFLICTS,
      label: 'Conflicts',
      icon: '/menu_conflicts.png',
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
}
